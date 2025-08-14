import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {SessionStorageService} from "@services/session-storage.service";
import {TOKEN_KEY} from "@interceptors/token-header.interceptor";

export const loginGuard: CanActivateFn = (route, state) => {
	const storage = inject(SessionStorageService);
	const router = inject(Router);
	const isAuthenticated = storage.getItem(TOKEN_KEY);
	if (!isAuthenticated) return true;
	const redirectUrl = route.queryParamMap.get("redirectUrl") || "/main";
	return router.parseUrl(redirectUrl);
};