import {HttpContext, HttpContextToken, HttpErrorResponse, HttpInterceptorFn} from "@angular/common/http";
import {catchError, EMPTY, from, switchMap} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {HttpNotify} from "@rest/http-notify.service";
import {restEndpoints} from "@rest/rest-endpoints";
import {AuthentificationService} from "@services/authentification.service";

export const BYPASS_REFRESH_INTERCEPTOR = new HttpContextToken<boolean>(() => false);
export const authRefreshInterceptor: HttpInterceptorFn = (req, next) => {
	if (req.context.get(BYPASS_REFRESH_INTERCEPTOR)) {
		return next(req);
	}
	const router = inject(Router);
	const http = inject(HttpNotify);
	const auth = inject(AuthentificationService);
	const redirectToLogin = () => from(
		router.navigate(["/login"], {
			queryParams: {
				returnUrl: router.url && !router.url.startsWith("/login") &&
				!router.url.startsWith("/error") ? router.url : "/main/me",
				fi: true
			}
		})
	).pipe(switchMap(() => EMPTY));
	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 401) {
				auth.removeToken();
				return from(http.post<{ accessToken: string }>(
					restEndpoints.user.refreshToken,
					{},
					{withCredentials: true, context: new HttpContext().set(BYPASS_REFRESH_INTERCEPTOR, true)}
				)).pipe(
					switchMap(result => {
						if (result?.accessToken) {
							auth.setToken(result.accessToken);
							const newReq = req.clone({
								setHeaders: {Authorization: `Bearer ${result.accessToken}`},
								context: req.context.set(BYPASS_REFRESH_INTERCEPTOR, true)
							});
							return next(newReq);
						}
						return redirectToLogin();
					}),
					catchError(refreshError => {
						console.error("Refresh token failed", refreshError);
						return redirectToLogin();
					})
				);
			}
			throw error;
		})
	);
};