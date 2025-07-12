import {AbstractControl} from "@angular/forms";
import {ILoginModel} from "@interfaces/login-model.interface";

export interface IRegisterModel extends ILoginModel {
	confirmPassword: AbstractControl<string | null>;
}