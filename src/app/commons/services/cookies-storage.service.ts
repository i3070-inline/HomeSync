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
	}): void {
		try {
			this.cookiesService.set(key, String(value),
				options?.expires ?? 7,
				options?.path ?? "/",
				options?.domain ?? "",
				options?.secure ?? false,
				options?.sameSite ?? "Lax",
				options?.partitioned ?? false);
		}
		catch (error) {
			console.error(`Failed to set cookie with key "${key}":`, error);
			throw error;
		}
	}
	public getItem<T>(key: string): T | undefined {
		try {
			const value = this.cookiesService.get(key);
			return value as T ?? undefined;
		}
		catch (error) {
			console.error(`Failed to get cookie with key "${key}":`, error);
			throw error;
		}
	}
	public removeItem(key: string, options?: {
		path?: string;
		domain?: string;
	}): void {
		try {
			this.cookiesService.delete(
				key,
				options?.path ?? "/",
				options?.domain ?? ""
			);
		}
		catch (error) {
			console.error(`Failed to remove cookie with key "${key}":`, error);
			throw error;
		}
	}
	public removeAll(): void {
		try {
			this.cookiesService.deleteAll();
		}
		catch (error) {
			console.error("Failed to remove all cookies:", error);
			throw error;
		}
	}
	//endregion
}
