import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthentificationService} from "@services/authentification.service";

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
	const auth = inject(AuthentificationService);
	if (auth.isAuthenticated()) {
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${auth.accessToken()}`
			}
		});
	}
	return next(req);
};