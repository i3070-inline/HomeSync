import {Injectable, signal} from "@angular/core";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {system} from "@constants/types";
import {buildIconSvgPath} from "@utils/path-icon-helper";

type themeType = "light" | "dark" | system;

@Injectable({
	providedIn: "root"
})
export class ThemeHandlerService {
	//region Members
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
	//region Methods
	public onSelectedThemeChange(value: ISelectItemModel | null): void {
		if (!value) return;
		const theme = value as ISelectItemModel<themeType>;
		if (!theme) return;
		this.selectedTheme.set(theme);
		this.setTheme(theme);
	}
	private setTheme(theme: ISelectItemModel<themeType>): void {
		const lightLinks = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
		const darkLinks = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
		let lightMedia: string;
		let darkMedia: string;

		if (theme.value === 'system') {
			lightMedia = '(prefers-color-scheme: light)';
			darkMedia = '(prefers-color-scheme: dark)';
		} else {
			lightMedia = (theme.value === 'light') ? 'all' : 'not all';
			darkMedia = (theme.value === 'dark') ? 'all' : 'not all';
		}

		lightLinks.forEach(link => (link as HTMLLinkElement).media = lightMedia);
		darkLinks.forEach(link => (link as HTMLLinkElement).media = darkMedia);
	}
	//endregion
}
