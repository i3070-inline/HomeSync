import {inject, Injectable, signal} from "@angular/core";
import {LocalStorageService} from "@services/local-storage.service";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {TranslateService} from "@ngx-translate/core";

type languageType = "ro" | "en" | "ru";

@Injectable({
	providedIn: "root"
})
export class LanguageHandlerService {
	//region Members
	private readonly localStorageService = inject(LocalStorageService);
	private readonly translateService = inject(TranslateService);
	private readonly localStorageKey = "language";
	public languages = signal<ISelectItemModel<languageType>[]>([
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
	public selectedLanguage = signal<ISelectItemModel<languageType> | null>(null);
	//endregion
	//region Constructor
	constructor() {
		const storageLanguage = this.getStorageLanguage();
		this.setStorageLanguage(storageLanguage);
		this.setLanguage(storageLanguage);
		this.selectedLanguage.set(this.languages().find(lang => lang.value === storageLanguage) || null);
	}
	//endregion
	//region Methods
	public OnSelectedLanguageChange(value: ISelectItemModel | null): void {
		const language = value as ISelectItemModel<languageType>;
		if (!language) return;
		this.selectedLanguage.set(language);
		this.setLanguage(language.value);
		this.setStorageLanguage(language.value);
	}
	private setLanguage(language: languageType): void {
		this.translateService.setDefaultLang(language);
		this.translateService.use(language);
	}
	private getStorageLanguage(): languageType {
		return this.localStorageService.getItem<languageType>(this.localStorageKey) || "en";
	}
	private setStorageLanguage(language: languageType): void {
		this.localStorageService.setItem<languageType>(this.localStorageKey, language);
	}
	//endregion
}
