import {Injectable, Signal, signal} from "@angular/core";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {SettingsHandlerBase} from "@services/base/settings-handler-base";
import {languageType} from "@constants/types";

@Injectable({
	providedIn: "root"
})
export class LanguageHandlerService extends SettingsHandlerBase<languageType> {
	//region Overrides
	protected override get cookiesKey(): string {
		return this.cookiesSettings.langKey;
	}
	protected override get cookiesValue(): languageType {
		return this.cookiesSettings.langCookiesValue();
	}
	public override get options(): Signal<ISelectItemModel<languageType>[]> {
		return signal<ISelectItemModel<languageType>[]>([
			{
				value: "en",
				name: "SETTINGS.LANGUAGE.OPTIONS.ENGLISH",
				iconPath: "assets/icons/language-en-icon.png"
			},
			{
				value: "ro",
				name: "SETTINGS.LANGUAGE.OPTIONS.ROMANIAN",
				iconPath: "assets/icons/language-ro-icon.png"
			},
			{
				value: "ru",
				name: "SETTINGS.LANGUAGE.OPTIONS.RUSSIAN",
				iconPath: "assets/icons/language-ru-icon.png"
			}
		]);
	}
	protected override handlingChanges(value: languageType): void {
		this.translateService.setDefaultLang(value);
		this.translateService.use(value);
		this.platformService.runOnBrowserPlatform(() => {
			document.documentElement.setAttribute(this.cookiesKey, value);
		});
	}
	//endregion
}
