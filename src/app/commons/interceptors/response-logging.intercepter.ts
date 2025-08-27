import {HttpErrorResponse, HttpInterceptorFn, HttpResponse} from "@angular/common/http";
import {tap} from "rxjs";

export const responseLoggingInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		tap({
			next: (event) => {
				if (event instanceof HttpResponse) {
					console.log("%c[HTTP Response]", "color: limegreen; font-weight: bold; font-style: italic;", {
						method: req.method,
						url: req.url,
						status: event.status,
						statusText: event.statusText,
						body: event.body
					});
				}
			},
			error: (error: HttpErrorResponse) => {
				console.log("%c[HTTP Error]", "color: red; font-weight: bold; font-style: italic;", {
					method: req.method,
					url: req.url,
					status: error.status,
					statusText: error.statusText,
					error: error.message
				});
			}
		})
	);
};