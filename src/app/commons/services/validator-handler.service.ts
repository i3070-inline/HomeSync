import {inject, Injectable} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {TranslocoService} from "@ngneat/transloco";

@Injectable({
	providedIn: "root"
})
export class ValidatorHandlerService {
	//region Members
	private translate = inject(TranslocoService);
	private errorMessages: Record<string, string> = {
		required: "VALIDATORS.REQUIRED",
		minlength: "VALIDATORS.MIN_LENGTH",
		passwordMismatch: "VALIDATORS.PASSWORD_MISMATCH",
		email: "VALIDATORS.INVALID_EMAIL"
	};
	//endregion
	//region Methods
	public getErrorMessage(control: AbstractControl): string {
		if (!control.errors || !control.dirty) return "";
		const errorKey = Object.keys(control.errors)[0];
		const messageKey = this.errorMessages[errorKey] || "";
		const params = control.errors[errorKey] || {};
		return this.translate.translate(messageKey, params);
	}
	//endregion
}
