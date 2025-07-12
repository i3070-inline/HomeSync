import {PlatformService} from "@services/platform.service";
import {inject} from "@angular/core";

const platformService = inject(PlatformService);
export function getCssVariablesValue(name: string): string | undefined {
	return platformService.runOnBrowserPlatform(() => {
		const value = getComputedStyle(document.documentElement)
			.getPropertyValue(`--${name}`)
			.trim();
		return value === "" ? undefined : value;
	});
}