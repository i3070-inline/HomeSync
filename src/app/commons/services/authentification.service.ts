import {inject, Injectable, Signal, signal} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginModel} from "@interfaces/login-model.interface";
import {AccountBase} from "@services/base/account-base";
import {ControlsOf} from "@constants/types";
import {strictEmailValidator} from "@validators/input.validators";
import {firstValueFrom} from "rxjs";
import {restEndpoints} from "@rest/rest-endpoints";
import {Router} from "@angular/router";
import {JwtService} from "@services/jwt.service";

@Injectable({
	providedIn: "root"
})
export class AuthentificationService extends AccountBase<ILoginModel> {
	//region Members
	private readonly router = inject(Router);
	private readonly jwtService = inject(JwtService);
	//endregion
	//region Overrides
	public override get name(): Signal<string> {
		return signal("authentification");
	}
	protected override async onParticularExecution(): Promise<{
		successful: boolean;
		data?: Record<string, unknown>;
	}> {
		try {
			const response = await firstValueFrom(
				this.http.post<{ accessToken: string }>(restEndpoints.user.authentification, this.accountForm().value));
			if (!this.jwtService.isTokenExpired(response.accessToken)) {
				await firstValueFrom(this.http.post<{ accessToken: string }>(restEndpoints.user.refreshToken));
				this.jwtService.setToken(response.accessToken);
				return {successful: true};
			}
		}
		catch (error) {
			console.error("Authentication failed:", error);
			return {successful: false};
		}
		return {successful: false};
	}
	public override accountForm = signal<FormGroup<ControlsOf<ILoginModel>>>(
		new FormGroup<ControlsOf<ILoginModel>>({
			email: new FormControl<string | null>(null, [Validators.required, strictEmailValidator()]),
			password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)])
		})
	);
	public override resetAccountForm() {
		const password = this.accountForm().controls.password;
		password.reset();
		password.markAsPristine();
	}
	//endregion
}
