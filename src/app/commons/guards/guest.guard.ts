import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthentificationService} from "@services/authentification.service";

export const guestGuard: CanActivateFn = async (route, state) => {
	const router = inject(Router);
	const auth = inject(AuthentificationService);
	const fromInterceptor = route.queryParamMap.get("fi") === "true";
	if (fromInterceptor || auth.isRequestedLogout()) {
		return true;
	}
	if (auth.isAuthenticated()) {
		return router.createUrlTree([route.queryParamMap.get("redirectUrl") || "/main"]);
	}
	return true;
};
