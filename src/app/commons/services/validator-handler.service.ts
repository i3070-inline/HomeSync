import {Injectable} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {LangHelper} from "@utils/lang-helper";

@Injectable({
	providedIn: "root"
})
export class ValidatorHandlerService {
	//region Members
	protected readonly langHelper = LangHelper;
	private errorMessages: Record<string, string> = {
		required: LangHelper.validator("REQUIRED"),
		minlength: LangHelper.validator("MIN_LENGTH"),
		passwordMismatch: LangHelper.validator("PASSWORD_MISMATCH"),
		email: LangHelper.validator("INVALID_EMAIL")
	};
	//endregion
	//region Methods
	public getErrorMessage(control: AbstractControl): string {
		if (!control.errors || !control.dirty) return "";
		const errorKey = Object.keys(control.errors)[0];
		return this.errorMessages[errorKey] || "";
	}
	//endregion
}
