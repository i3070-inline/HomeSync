import {Injectable, Signal, signal} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IRegisterModel} from "@interfaces/register-model.interface";
import {AccountBase} from "@services/base/account-base";
import {ControlsOf} from "@constants/types";
import {matchPasswordValidator} from "@validators/input.validators";

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
				username: new FormControl<string | null>(null, [Validators.required, Validators.email]),
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
		await new Promise(resolve => setTimeout(resolve, 2000));
		return true; // TODO: Implement actual authentication logic here
	}
	//endregion
}