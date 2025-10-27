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
		return "lang";
	}
	protected override get defaultValue(): languageType {
		return "en";
	}
	public override get options(): Signal<ISelectItemModel<languageType>[]> {
		return signal<ISelectItemModel<languageType>[]>([
			{
				value: "en",
				name: this.langHelper.settingsOption("LANGUAGE", "ENGLISH"),
				iconPath: "assets/icons/language-en-icon.png"
			},
			{
				value: "ro",
				name: this.langHelper.settingsOption("LANGUAGE", "ROMANIAN"),
				iconPath: "assets/icons/language-ro-icon.png"
			},
			{
				value: "ru",
				name: this.langHelper.settingsOption("LANGUAGE", "RUSSIAN"),
				iconPath: "assets/icons/language-ru-icon.png"
			}
		]);
	}
	public override async init(): Promise<void> {
		await super.init();
		const cookiesValue = this.selectedOption()?.value as languageType;
		const allOptions = this.options().map(option => option.value);
		this.translateService.setDefaultLang(this.defaultValue);
		this.translateService.setAvailableLangs(allOptions);
		this.translateService.setActiveLang(cookiesValue);

	}
	protected override handlingChanges(value: languageType): void {
		this.translateService.setActiveLang(value);
		this.platformService.runOnBrowserPlatform(() => {
			document.documentElement.setAttribute(this.cookiesKey, value);
		});
	}
	//endregion
}
