import {Injectable, signal, Signal} from "@angular/core";
import {AccountBase} from "@services/base/account-base";
import {IForgotPasswordInterface} from "@interfaces/forgot-password.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ControlsOf} from "@constants/types";
import {strictEmailValidator} from "@validators/input.validators";

@Injectable({
	providedIn: "root"
})
export class ForgotHandlerService extends AccountBase<IForgotPasswordInterface> {
	//region Overrides
	public override get name(): Signal<string> {
		return signal("forgot");
	}
	public override accountForm = signal<FormGroup<ControlsOf<IForgotPasswordInterface>>>(
		new FormGroup<ControlsOf<IForgotPasswordInterface>>({
			email: new FormControl<string | null>(null, [Validators.required, strictEmailValidator()])
		})
	);
	protected override async onParticularExecution(): Promise<{ successful: boolean; data?: unknown; }> {
		await new Promise(resolve => setTimeout(resolve, 2000));
		return {successful: true}; // TODO: Implement actual authentication logic here
	}
	//endregion
}