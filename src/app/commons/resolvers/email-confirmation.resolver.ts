import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {HttpNotify} from "@rest/http-notify.service";
import {restEndpoints} from "@rest/rest-endpoints";
import {HttpContext, HttpErrorResponse} from "@angular/common/http";
import {BYPASS_REFRESH_INTERCEPTOR} from "@interceptors/auth-refresh.interceptor";

export const emailConfirmationResolver: ResolveFn<{
	confirmed: boolean
}> = async (route, state) => {
	const http = inject(HttpNotify);
	const router = inject(Router);
	const token = route.queryParamMap.get("token");
	if (!token) return {confirmed: false};
	try {
		await http.post(`${restEndpoints.user.emailConfirmation}${token}`, {},
			{
				context: new HttpContext().set(BYPASS_REFRESH_INTERCEPTOR, true)
			});
		return {confirmed: true};
	}
	catch (error) {
		console.error("Email confirmation failed:", error);
		if (error instanceof HttpErrorResponse && error.status === 401) {
			return new RedirectCommand(router.parseUrl("/error/404"));
		}
		return {confirmed: false};
	}
};