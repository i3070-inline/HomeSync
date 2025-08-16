import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {JwtService} from "@services/jwt.service";

export const guestGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const jwt = inject(JwtService);
	if (jwt.isTokenExpired()) return true;
	const redirectUrl = route.queryParamMap.get("redirectUrl") || "/main/me";
	return router.parseUrl(redirectUrl);
};