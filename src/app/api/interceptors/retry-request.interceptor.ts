import {HttpInterceptorFn} from "@angular/common/http";
import {retry, timeout, timer} from "rxjs";

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		timeout(5000),
		retry({
			count: 3,
			delay: (error, retryCount) => {
				console.log(`%c[Retry ${retryCount}/3]`, "color: gold; font-weight: bold; font-style: italic;", {
					method: req.method,
					url: req.url
				});
				return timer(0);
			},
			resetOnSuccess : true
		})
	);
};