import {HttpInterceptorFn} from "@angular/common/http";

export const requestLoggingInterceptor: HttpInterceptorFn = (req, next) => {
	console.log("%c[HTTP Request]", "color: deepskyblue; font-weight: bold; font-style: italic;", {
		method: req.method,
		url: req.urlWithParams,
		headers: req.headers.keys(),
		body: req.body
	});
	return next(req);
};

