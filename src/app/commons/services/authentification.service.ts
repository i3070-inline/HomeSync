import {inject, Injectable, Signal, signal} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginModel} from "@interfaces/login-model.interface";
import {AccountBase} from "@services/base/account-base";
import {ControlsOf} from "@constants/types";
import {strictEmailValidator} from "@validators/input.validators";
import {RestBaseService} from "@rest/rest-base.service";
import {firstValueFrom} from "rxjs";
import {IAuthModelInterface} from "@models/auth-model.interface";
import {StorageFacadeService} from "@services/facade/storage-facade.service";
import {restEndpoints} from "@rest/rest-endpoints";
import {TOKEN_KEY} from "@interceptors/token-header.interceptor";

@Injectable({
	providedIn: "root"
})
export class AuthentificationService extends AccountBase<ILoginModel> {
	//region Members
	private readonly http = inject(RestBaseService);
	private readonly storage = inject(StorageFacadeService);
	//endregion
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
		try {
			const response = await firstValueFrom(
				this.http.post<IAuthModelInterface>(restEndpoints.user.authentification, this.accountForm().value));
			this.storage.sessionStorage.setItem(TOKEN_KEY, response.accessToken);
			return true;
		}
		catch (error) {
			return false;
		}
	}
	public override resetAccountForm() {
		const password = this.accountForm().controls.password;
		password.reset();
		password.markAsPristine();
	}
	//endregion
}
