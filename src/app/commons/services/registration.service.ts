import {Injectable, Signal, signal} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IRegisterModel} from "@interfaces/register-model.interface";
import {AccountBase} from "@services/base/account-base";
import {controlsOf} from "@constants/types";
import {matchPasswordValidator, strictEmailValidator} from "@validators/input.validators";
import {restEndpoints} from "@rest/rest-endpoints";
import {HttpContext} from "@angular/common/http";
import {BYPASS_REFRESH_INTERCEPTOR} from "@interceptors/auth-refresh.interceptor";

@Injectable({
	providedIn: "root"
})
export class RegistrationService extends AccountBase<IRegisterModel> {
	//region Overrides
	public override get name(): Signal<string> {
		return signal("registration");
	}
	public override accountForm = signal(
		(() => {
			const form = new FormGroup<controlsOf<IRegisterModel>>({
				email: new FormControl<string | null>(null, [Validators.required, strictEmailValidator()]),
				password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
				confirmPassword: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)])
			});
			form.controls.confirmPassword.addValidators(
				matchPasswordValidator(() => form.controls.password.value)
			);
			return form;
		})()
	);
	protected override async onParticularExecution(): Promise<boolean> {
		try {
			const user = (() => {
				const formValue = this.accountForm().getRawValue();
				const {confirmPassword, ...rest} = formValue;
				return {...rest, username: rest.email};
			})();
			await this.http.post(restEndpoints.user.register,
				user,
				{context: new HttpContext().set(BYPASS_REFRESH_INTERCEPTOR, true)},
				{
					message: this.langHelper.notificationAccount("SIGN_UP", "START"),
					timeout : 10000
				}
			);
			return true;
		}
		catch (error) {
			return false;
		}
	}
	//endregion
}