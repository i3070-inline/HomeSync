import {inject, Injectable} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ValidatorHandlerService {
	//region Members
	private translate = inject(TranslateService);
	private errorMessages: Record<string, string> = {
		required: "VALIDATORS.REQUIRED",
		minlength: "VALIDATORS.MIN_LENGTH",
		passwordMismatch: "VALIDATORS.PASSWORD_MISMATCH"
	};
	//endregion
	//region Methods
	public getErrorMessage(control: AbstractControl): string {
		if (!control.errors || !control.touched) return "";
		const errorKey = Object.keys(control.errors)[0];
		const messageKey = this.errorMessages[errorKey] || "";
		const params = control.errors[errorKey] || {};
		return this.translate.instant(messageKey, params);
	}
	//endregion
}
