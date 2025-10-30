import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {inject, makeStateKey, TransferState} from "@angular/core";
import {HttpNotify} from "@rest/http-notify.service";
import {restEndpoints} from "@rest/rest-endpoints";
import {HttpContext, HttpErrorResponse} from "@angular/common/http";
import {BYPASS_REFRESH_INTERCEPTOR} from "@interceptors/auth-refresh.interceptor";
import {PlatformService} from "@services/platform.service";

const EMAIL_CONFIRM_STATE = makeStateKey<boolean>("email-confirmed");
export const emailConfirmationResolver: ResolveFn<{ confirmed: boolean }> = async (route) => {
	const http = inject(HttpNotify);
	const router = inject(Router);
	const transferState = inject(TransferState);
	const platform = inject(PlatformService);
	const token = route.queryParamMap.get("token");
	if (!token) return new RedirectCommand(router.parseUrl("/error/404"));
	const cached = transferState.get(EMAIL_CONFIRM_STATE, null);
	if (cached !== null) {
		return cached
			? {confirmed: true}
			: new RedirectCommand(router.parseUrl("/error/404"));
	}
	const setStateIfServer = (confirmed: boolean) => {
		if (platform.isServer()) {
			transferState.set(EMAIL_CONFIRM_STATE, confirmed);
		}
	};
	try {
		await http.post(`${restEndpoints.user.emailConfirmation}${token}`, {}, {
			context: new HttpContext().set(BYPASS_REFRESH_INTERCEPTOR, true)
		});
		setStateIfServer(true);
		return {confirmed: true};
	}
	catch (error) {
		console.error("Email confirmation failed:", error);
		setStateIfServer(false);
		return error instanceof HttpErrorResponse
			? new RedirectCommand(router.parseUrl("/error/404"))
			: {confirmed: false};
	}
};
