import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthentificationService} from "@services/authentification.service";

export const authGuard: CanActivateFn = async (route, state) => {
	const router = inject(Router);
	const auth = inject(AuthentificationService);
	await auth.loadCurrentUser();
	if (auth.isAuthenticated()) return true;
	return router.createUrlTree(
		["/login"],
		{queryParams: {returnUrl: state.url}}
	);
};