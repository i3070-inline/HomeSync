import {inject} from "@angular/core";
import {PlatformService} from "@services/platform.service";

export abstract class StorageHandlerBase {
	//region Members
	protected abstract get storage(): Storage;
	private readonly platform = inject(PlatformService);
	//endregion
	//region Methods
	public getItem<T>(key: string): T | undefined {
		return this.platform.runOnBrowserPlatform(() => {
			const item = this.storage.getItem(key);
			if (!item) return undefined;
			try {
				return JSON.parse(item) as T;
			}
			catch (e) {
				console.error(`Failed to parse JSON from "${this.storage.constructor.name}"  with key "${key}":`, e);
				return undefined;
			}
		});
	}
	public setItem<T>(key: string, value: T): void | boolean {
		this.platform.runOnBrowserPlatform((): boolean | void => {
			try {
				this.storage.setItem(key, JSON.stringify(value));
			}
			catch (e) {
				console.error(`Failed to set item in "${this.storage.constructor.name}" with key "${key}":`, e);
				return false;
			}
			return true;
		});
	}
	public removeItem(key: string): void | boolean {
		return this.platform.runOnBrowserPlatform(() => {
			try {
				this.storage.removeItem(key);
			}
			catch (e) {
				console.error(`Failed to remove item from "${this.storage.constructor.name}" with key "${key}":`, e);
				return false;
			}
			return true;
		});
	}
	//
}