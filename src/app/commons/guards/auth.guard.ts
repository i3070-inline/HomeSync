import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {SessionStorageService} from "@services/session-storage.service";
import {TOKEN_KEY} from "@interceptors/token-header.interceptor";

export const authGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const storage = inject(SessionStorageService);
	const isAuthenticated = storage.getItem(TOKEN_KEY);
	if (isAuthenticated) return true;
	return router.createUrlTree(
		["/login"],
		{queryParams: {returnUrl: state.url}}
	);
};