import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
	providedIn: "root"
})
export class RestBaseService {
	//region Members
	private readonly http = inject(HttpClient);
	//endregion
	//region Methods
	get<T>(url: string, params?: HttpParams | { [param: string]: string | number }): Observable<T> {
		return this.http.get<T>(url, {params});
	}
	post<T>(url: string, body: any, options?: object): Observable<T> {
		return this.http.post<T>(url, body, options);
	}
	put<T>(url: string, body: any, options?: object): Observable<T> {
		return this.http.put<T>(url, body, options);
	}
	delete<T>(url: string, options?: object): Observable<T> {
		return this.http.delete<T>(url, options);
	}
	//endregion

}
