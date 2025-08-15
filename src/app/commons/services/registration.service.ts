import {Injectable, Signal, signal} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IRegisterModel} from "@interfaces/register-model.interface";
import {AccountBase} from "@services/base/account-base";
import {ControlsOf} from "@constants/types";
import {matchPasswordValidator, strictEmailValidator} from "@validators/input.validators";
import {restEndpoints} from "@rest/rest-endpoints";
import {firstValueFrom} from "rxjs";

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
			const form = new FormGroup<ControlsOf<IRegisterModel>>({
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
	protected override async onParticularExecution(): Promise<{
		successful: boolean;
		data?: Record<string, unknown>;
	}> {
		try {
			const user = {
				"email": this.accountForm().value.email,
				"username": this.accountForm().value.email,
				"password": this.accountForm().value.password
			};
			await firstValueFrom(this.http.post<{ message: string }>(restEndpoints.user.register, user));
			return {successful: true};
		}
		catch (error) {
			return {successful: false};
		}
	}
	//endregion
}