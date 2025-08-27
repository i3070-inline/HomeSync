import {HttpErrorResponse, HttpInterceptorFn} from "@angular/common/http";
import {retry, timer} from "rxjs";
import {isHttpErrorRetry} from "@utils/http-error-helper";

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		retry({
			count: 3,
			delay: (error: HttpErrorResponse, retryCount) => {
				if (isHttpErrorRetry(error.status)) {
					console.log(`%c[Retry ${retryCount}/3]`, "color: gold; font-weight: bold; font-style: italic;", {
							method: req.method,
							url: req.url,
							status: error.status
						}
					);
					return timer(1000);
				}
				throw error;
			}
		})
	);
};