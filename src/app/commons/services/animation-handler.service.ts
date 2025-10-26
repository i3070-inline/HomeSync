import {Injectable, Signal, signal} from "@angular/core";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {animationType} from "@constants/types";
import {SettingsHandlerBase} from "@services/base/settings-handler-base";

@Injectable({
	providedIn: "root"
})
export class AnimationHandlerService extends SettingsHandlerBase<animationType> {
	//region Overrides
	protected override get cookiesKey(): string {
		return "anim";
	}
	protected override get defaultValue(): animationType {
		return "system";
	}
	public override get options(): Signal<ISelectItemModel<animationType>[]> {
		return signal<ISelectItemModel<animationType>[]>([
			{
				value: "active",
				name: this.langHelper.settingsOption("ANIMATION", "ACTIVE"),
				iconPath: buildIconSvgPath("animation-active-icon"),
				iconColor: "var(--success-color)"
			},
			{
				value: "reduce",
				name: this.langHelper.settingsOption("ANIMATION", "REDUCE"),
				iconPath: buildIconSvgPath("animation-reduce-icon"),
				iconColor: "var(--error-color)"
			},
			{
				value: "system",
				name: this.langHelper.settingsOption("ANIMATION", "SYSTEM"),
				iconPath: buildIconSvgPath("default-icon")
			}
		]);
	}
	protected override handlingChanges(value: animationType): void {
		this.platformService.runOnBrowserPlatform(() => {
			document.documentElement.setAttribute(this.cookiesKey, value);
		});
	}
	//endregion
}
