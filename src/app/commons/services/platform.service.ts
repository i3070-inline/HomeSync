import {inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";
import {Platform} from "@angular/cdk/platform";

@Injectable({
	providedIn: "root"
})
export class PlatformService {
	//region Members
	private readonly platformId = inject(PLATFORM_ID);
	private readonly platform = inject(Platform);
	//endregion
	//region Methods
	public isBrowser(): boolean {
		return isPlatformBrowser(this.platformId);
	}
	public isServer(): boolean {
		return isPlatformServer(this.platformId);
	}
	public isAndroid(): boolean {
		return this.platform.ANDROID;
	}
	public isIOS(): boolean {
		return this.platform.IOS;
	}
	public isMobile(): boolean {
		return this.isAndroid() || this.isIOS();
	}
	public isFirefox(): boolean {
		return this.platform.FIREFOX;
	}
	public isSafari(): boolean {
		return this.platform.SAFARI;
	}
	public isChrome(): boolean {
		return this.platform.BLINK;
	}
	public isEdge(): boolean {
		return this.platform.EDGE;
	}
	public isTrident(): boolean {
		return this.platform.TRIDENT;
	}
	public isWebKit(): boolean {
		return this.platform.WEBKIT;
	}
	public isMozilla(): boolean {
		return this.platform.FIREFOX;
	}
	public runOnBrowserPlatform<T>(fn: () => T): T | undefined {
		if (!this.isBrowser()) return undefined;
		return fn();
	}
	public runMultipleOnBrowserPlatform<T extends any[]>(...fns: { [K in keyof T]: () => T[K] }): { [K in keyof T]: T[K] | undefined } {
		const undefinedFns = fns.map(() => undefined) as { [K in keyof T]: undefined };
		if (!this.isBrowser()) return undefinedFns;
		return fns.map(fn => fn()) as { [K in keyof T]: T[K] };
	}
	//endregion
}