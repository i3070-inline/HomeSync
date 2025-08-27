import {HttpInterceptorFn} from "@angular/common/http";
import {timeout} from "rxjs";

export const timeoutInterceptor: HttpInterceptorFn = (res, next) => {
	return next(res).pipe(
		timeout(5000)
	);
};