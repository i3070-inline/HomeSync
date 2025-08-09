import {FormControl} from "@angular/forms";

export type system = "system";
export type ControlsOf<T> = {
	[K in keyof T]: FormControl<T[K]>;
};