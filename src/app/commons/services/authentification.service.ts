import {Injectable, Signal, signal} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginModel} from "@interfaces/login-model.interface";
import {AccountBase} from "@services/base/account-base";
import {ControlsOf} from "@constants/types";
import {strictEmailValidator} from "@validators/input.validators";

@Injectable({
	providedIn: "root"
})
export class AuthentificationService extends AccountBase<ILoginModel> {
	//region Overrides
	public override get name(): Signal<string> {
		return signal("authentification");
	}
	public override accountForm = signal<FormGroup<ControlsOf<ILoginModel>>>(
		new FormGroup<ControlsOf<ILoginModel>>({
			email: new FormControl<string | null>(null, [Validators.required, strictEmailValidator()]),
			password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)])
		})
	);
	protected override async onParticularExecution(): Promise<boolean> {
		await new Promise(resolve => setTimeout(resolve, 2000));
		return true; // TODO: Implement actual authentication logic here
	}
	public override resetAccountForm() {
		const password = this.accountForm().controls.password;
		password.reset();
		password.markAsPristine();
	}
	//endregion
}
