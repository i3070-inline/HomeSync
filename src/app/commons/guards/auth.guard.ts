import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {JwtService} from "@services/jwt.service";

export const authGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	if (!inject(JwtService).isTokenExpired()) return true;
	return router.createUrlTree(
		["/login"],
		{queryParams: {returnUrl: state.url}}
	);
};