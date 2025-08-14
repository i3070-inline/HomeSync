import {HttpInterceptorFn} from "@angular/common/http";
import {retry, timeout} from "rxjs";

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		retry(3),
		timeout(5000),
	);
};