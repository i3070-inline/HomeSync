import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthentificationService} from "@services/authentification.service";

export const guestGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	if (inject(AuthentificationService).isAuthenticated()) {
		return router.createUrlTree([route.queryParamMap.get("redirectUrl") || "/main/me"]);
	}
	return true;
};