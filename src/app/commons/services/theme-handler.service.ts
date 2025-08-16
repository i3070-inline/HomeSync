import {Injectable, Signal, signal} from "@angular/core";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {system} from "@constants/types";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {SettingsHandlerBase} from "@services/base/settings-handler-base";

type themeType = "light" | "dark" | system;

@Injectable({
	providedIn: "root"
})
export class ThemeHandlerService extends SettingsHandlerBase<themeType> {
	//region Overrides
	protected override get localStorageKey(): string {
		return "theme";
	}
	protected override get defaultValue(): themeType {
		return "system";
	}
	public override get options(): Signal<ISelectItemModel<themeType>[]> {
		return signal<ISelectItemModel<themeType>[]>([
			{
				value: "light",
				name: "SETTINGS.THEME.OPTIONS.LIGHT",
				iconPath: buildIconSvgPath("light-icon"),
				iconColor: "var(--warning-color)"
			},
			{
				value: "dark",
				name: "SETTINGS.THEME.OPTIONS.DARK",
				iconPath: buildIconSvgPath("dark-icon"),
				iconColor: "var(--info-color)"
			},
			{
				value: "system",
				name: "SETTINGS.THEME.OPTIONS.SYSTEM",
				iconPath: buildIconSvgPath("default-icon")
			}
		]);
	}
	protected override handlingChanges(value: themeType): void {
		this.platformService.runOnBrowserPlatform(async () => {
			const animationKey = "animation";
			const before = document.documentElement.getAttribute(animationKey);
			document.documentElement.setAttribute(animationKey, "reduce");
			document.documentElement.setAttribute(this.localStorageKey, value);
			await new Promise(resolve => setTimeout(resolve, 1000));
			document.documentElement.setAttribute(animationKey, before || "reduce");
		});
	}
	//endregion
}
