import {PlatformService} from "@services/platform.service";

export function getCssVariablesValue(platformService: PlatformService,name: string, ): string | undefined {
	return platformService.runOnBrowserPlatform(() => {
		const value = getComputedStyle(document.documentElement)
			.getPropertyValue(`--${name}`)
			.trim();
		return value === "" ? undefined : value;
	});
}