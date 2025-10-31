import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthentificationService} from "@services/authentification.service";

export const authGuard: CanActivateFn = async (route, state) => {
	const router = inject(Router);
	const auth = inject(AuthentificationService);
	if (!auth.isAuthenticated()) {
		await auth.init();
		return auth.isAuthenticated() ? true : router.createUrlTree(
			["/login"],
			{queryParams: {returnUrl: state.url}}
		);
	}
	return true;
};