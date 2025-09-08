import {Injectable, signal, Signal} from "@angular/core";
import {AccountBase} from "@services/base/account-base";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {controlsOf} from "@constants/types";
import {strictEmailValidator} from "@validators/input.validators";
import {IForgotPasswordModel} from "@interfaces/forgot-password-model.interface";

@Injectable({
	providedIn: "root"
})
export class ForgotHandlerService extends AccountBase<IForgotPasswordModel> {
	//region Overrides
	public override get name(): Signal<string> {
		return signal("forgot");
	}
	public override accountForm = signal<FormGroup<controlsOf<IForgotPasswordModel>>>(
		new FormGroup<controlsOf<IForgotPasswordModel>>({
			email: new FormControl<string | null>(null, [Validators.required, strictEmailValidator()])
		})
	);
	protected override async onParticularExecution(): Promise<boolean> {
		await new Promise(resolve => setTimeout(resolve, 2000));
		return true; // TODO: Implement actual authentication logic here
	}
	//endregion
}