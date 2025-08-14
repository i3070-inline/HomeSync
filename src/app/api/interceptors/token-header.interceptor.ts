import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {StorageFacadeService} from "@services/facade/storage-facade.service";

export const TOKEN_KEY = "token" as const;
export const tokenHeaderInterceptor: HttpInterceptorFn = (req, next) => {
	const token = inject(StorageFacadeService).localStorage.getItem(TOKEN_KEY);
	if (token) {
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});
	}
	return next(req);
};