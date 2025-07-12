import {AbstractControl} from "@angular/forms";

export interface ILoginModel {
	username: AbstractControl<string | null>;
	password: AbstractControl<string | null>;
}