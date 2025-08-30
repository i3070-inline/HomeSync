import {HttpErrorResponse, HttpInterceptorFn} from "@angular/common/http";
import {retry, timer} from "rxjs";

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
	const errorHttpRetry = [406, 422, 500, 502, 503, 504];
	return next(req).pipe(
		retry({
			count: 3,
			delay: (error: HttpErrorResponse, retryCount) => {
				if (errorHttpRetry.includes(error.status)) {
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