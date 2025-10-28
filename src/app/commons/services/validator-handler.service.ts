import {Injectable} from "@angular/core";
import {ValidationErrors} from "@angular/forms";
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
	public getErrorMessage(errors: ValidationErrors): { key: string; params?: Record<string, unknown> } | null {
		if (!errors) return null;
		const errorKey = Object.keys(errors)[0];
		const params = errors[errorKey] || {};
		const key = this.errorMessages[errorKey];
		if (!key) return null;
		return {key, params};
	}
	//endregion
}
