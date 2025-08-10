import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import isEmail from "validator/lib/isEmail";

export function matchPasswordValidator(getPassword: () => string | null): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const confirmPassword = control.value;
		const password = getPassword();
		if (password !== confirmPassword) {
			return {passwordMismatch: true};
		}
		return null;
	};
}
export function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
	const value = control.value;
	if (!value || !isEmail(value)) {
		return {email: true};
	}
	return null;
}