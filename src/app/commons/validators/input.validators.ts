import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

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
export function strictEmailValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;
		const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
		return !value || !emailPattern.test(value) ? {email: true} : null;
	};
}
