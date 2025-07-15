import {inject, Injectable, signal} from "@angular/core";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {system} from "@constants/types";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {PlatformService} from "@services/platform.service";
import {LocalStorageService} from "@services/local-storage.service";

type themeType = "light" | "dark" | system;

@Injectable({
	providedIn: "root"
})
export class ThemeHandlerService {
	//region Members
	private readonly localStorageService = inject(LocalStorageService);
	private readonly platformService = inject(PlatformService);
	private readonly localStorageKey = "theme";
	public themes = signal<ISelectItemModel<themeType>[]>(
		[
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
			}]);
	public selectedTheme = signal<ISelectItemModel<themeType> | null>(null);
	//endregion
	//region Constructor
	constructor() {
		const cookieTheme = this.getStorageTheme();
		if (!cookieTheme) return;
		this.selectedTheme.set(this.themes().find(theme => theme.value === cookieTheme) || null);
	}
	//endregion
	//region Methods
	public onSelectedThemeChange(value: ISelectItemModel | null): void {
		const theme = value as ISelectItemModel<themeType>;
		if (!theme) return;
		this.selectedTheme.set(theme);
		this.setTheme(theme);
		this.setStorageTheme(theme.value);
	}
	private getStorageTheme(): themeType | undefined {
		return this.localStorageService.getItem<themeType>(this.localStorageKey);
	}
	private setTheme(theme: ISelectItemModel<themeType>): void {
		this.platformService.runOnBrowserPlatform(() => {
			document.documentElement.setAttribute(this.localStorageKey, theme.value);
		});
	}
	private setStorageTheme(theme: themeType): void {
		this.localStorageService.setItem<themeType>(this.localStorageKey, theme);
	}
	//endregion
}
