import {inject, Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

@Injectable({
	providedIn: "root"
})
export class CookiesStorageService {
	//region Members
	private cookiesService = inject(CookieService);
	//endregion
	//region Methods
	public setItem<T>(key: string, value: T, options?: {
		expires?: number | Date;
		path?: string;
		domain?: string;
		secure?: boolean;
		sameSite?: "Lax" | "Strict" | "None";
		partitioned?: boolean;
	}): void | boolean {
		try {
			this.cookiesService.set(key, String(value),
				options?.expires ?? 7,
				options?.path ?? "/",
				options?.domain ?? "",
				options?.secure ?? false,
				options?.sameSite ?? "Lax",
				options?.partitioned ?? false);
			return true;
		}
		catch (e) {
			console.error(`Failed to set cookie with key "${key}":`, e);
			return false;
		}
	}
	public getItem<T>(key: string): T | undefined {
		try {
			const value = this.cookiesService.get(key);
			return value as T ?? undefined;
		}
		catch (e) {
			console.error(`Failed to get cookie with key "${key}":`, e);
			return undefined;
		}
	}
	public removeItem(key: string): void | boolean {
		try {
			this.cookiesService.delete(key);
			return true;
		}
		catch (e) {
			console.error(`Failed to remove cookie with key "${key}":`, e);
			return false;
		}
	}
	public removeAll(): void | boolean {
		try {
			this.cookiesService.deleteAll();
			return true;
		}
		catch (e) {
			console.error("Failed to remove all cookies:", e);
			return false;
		}
	}
	//endregion
}
