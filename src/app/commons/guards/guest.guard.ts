import {CanActivateFn, RedirectCommand, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthentificationService} from "@services/authentification.service";

export const guestGuard: CanActivateFn = async (route, state) => {
	const router = inject(Router);
	const auth = inject(AuthentificationService);
	const fromInterceptor = route.queryParamMap.get("fi") === "true";
	const redirectUrl = route.queryParamMap.get("redirectUrl") || "/main";
	if (fromInterceptor || auth.isRequestedLogout()) return true;
	if (auth.isAuthenticated()) new RedirectCommand(router.parseUrl(redirectUrl));
	await auth.init();
	return auth.isAuthenticated() ? new RedirectCommand(router.parseUrl(redirectUrl)) : true;
};
