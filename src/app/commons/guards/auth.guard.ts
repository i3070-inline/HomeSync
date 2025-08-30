import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthentificationService} from "@services/authentification.service";

export const authGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	if (inject(AuthentificationService).isAuthenticated()) return true;
	return router.createUrlTree(
		["/login"],
		{queryParams: {returnUrl: state.url}}
	);
};