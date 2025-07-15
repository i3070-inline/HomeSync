import {inject, Injectable} from "@angular/core";
import {PlatformService} from "@services/platform.service";

@Injectable({
	providedIn: "root"
})
export class LocalStorageService {
	//region Members
	private readonly platform = inject(PlatformService);
	//endregion
	//region Methods
	public getItem<T>(key: string): T | undefined {
		return this.platform.runOnBrowserPlatform(() => {
			const item = localStorage.getItem(key);
			if (!item) return undefined;
			try {
				return JSON.parse(item) as T;
			}
			catch (e) {
				console.error(`Failed to parse JSON from localStorage with key "${key}":`, e);
				return undefined;
			}
		});
	}
	public setItem<T>(key: string, value: T): void | boolean {
		this.platform.runOnBrowserPlatform((): boolean | void => {
			try {
				localStorage.setItem(key, JSON.stringify(value));
			}
			catch (e) {
				console.error(`Failed to set item in localStorage with key "${key}":`, e);
				return false;
			}
			return true;
		});
	}
	public removeItem(key: string): void | boolean {
		return this.platform.runOnBrowserPlatform(() => {
			try {
				localStorage.removeItem(key);
			}
			catch (e) {
				console.error(`Failed to remove item from localStorage with key "${key}":`, e);
				return false;
			}
			return true;
		});
	}
	//
}
