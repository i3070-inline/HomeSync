import {inject, Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

@Injectable({
	providedIn: "root"
})
export class CookiesService {
	//region Members
	private readonly cookiesService = inject(CookieService);
	//endregion
	//region Methods
	public getItem<T>(key: string): T | undefined {
		try {
			const item = this.cookiesService.get(key);
			if (!item) return undefined;
			return JSON.parse(<string>item) as T;
		}
		catch (e) {
			console.error(`Failed to get item from cookies with key "${key}":`, e);
			return undefined;
		}
	}
	public setItem<T>(key: string, value: T, day: number = 7): void {
		try {
			this.cookiesService.set(key, JSON.stringify(value), day);
		}
		catch (e) {
			console.error(`Failed to set item in cookies with key "${key}":`, e);
			return undefined;
		}
	}
	public removeItem(key: string): void {
		try {
			this.cookiesService.delete(key);
		}
		catch (e) {
			console.error(`Failed to remove item from cookies with key "${key}":`, e);
			return undefined;
		}
	}
	//endregion
}
