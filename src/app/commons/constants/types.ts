import {FormControl} from "@angular/forms";

export type system = "system";
export type languageType = "ro" | "en" | "ru";
export type themeType = "light" | "dark" | system;
export type animationType = "active" | "reduce" | system;
export type controlsOf<T> = {
	[K in keyof T]: FormControl<T[K]>;
};