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