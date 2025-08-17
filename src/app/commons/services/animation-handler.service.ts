import {Injectable, Signal, signal} from "@angular/core";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {animationType} from "@constants/types";
import {SettingsHandlerBase} from "@services/base/settings-handler-base";
import {Observable, Subject} from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AnimationHandlerService extends SettingsHandlerBase<animationType> {
	//region Members
	private readonly animationChangedSubject = new Subject<animationType>();
	public animationChanged$: Observable<animationType> = this.animationChangedSubject.asObservable();
	//endregion
	//region Overrides
	protected override get cookiesKey(): string {
		return this.cookiesSettings.animationKey;
	}
	protected override get cookiesValue(): animationType {
		return this.cookiesSettings.animCookiesValue();
	}
	public override get options(): Signal<ISelectItemModel<animationType>[]> {
		return signal<ISelectItemModel<animationType>[]>([
			{
				value: "active",
				name: "SETTINGS.ANIMATION.OPTIONS.ACTIVE",
				iconPath: buildIconSvgPath("animation-active-icon"),
				iconColor: "var(--success-color)"
			},
			{
				value: "reduce",
				name: "SETTINGS.ANIMATION.OPTIONS.REDUCE",
				iconPath: buildIconSvgPath("animation-reduce-icon"),
				iconColor: "var(--error-color)"
			},
			{
				value: "system",
				name: "SETTINGS.ANIMATION.OPTIONS.SYSTEM",
				iconPath: buildIconSvgPath("default-icon")
			}
		]);
	}
	protected override handlingChanges(value: animationType): void {
		this.platformService.runOnBrowserPlatform(() => {
			document.documentElement.setAttribute(this.cookiesKey, value);
		});
	}
	public override onSelectedOptionChange(value: ISelectItemModel | null): void {
		super.onSelectedOptionChange(value);
		this.animationChangedSubject.next(value?.value as animationType);
	}
	//endregion
}
