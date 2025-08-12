import {inject, Injectable, Signal, signal} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginModel} from "@interfaces/login-model.interface";
import {AccountBase} from "@services/base/account-base";
import {ControlsOf} from "@constants/types";
import {strictEmailValidator} from "@validators/input.validators";
import {HttpClient} from "@angular/common/http";
import {catchError, firstValueFrom, of} from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AuthentificationService extends AccountBase<ILoginModel> {
	private readonly http = inject(HttpClient);
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
		const formValue = this.accountForm().value;
		// Construiește payload-ul pentru POST
		const loginData: ILoginModel = {
			email: formValue.email!,
			password: formValue.password!
		};
		// Face POST request la serverul tău local
		const response = await firstValueFrom(
			this.http.post<any>("http://localhost:3001/auth/login", loginData).pipe(
				catchError(error => {
					console.error("Error:", error);
					return of({
						success: false,
						error: error.error,
						status: error.status
					});
				})
			)
		);

		console.log('Response:', response);


		return response.success ?? true;
	}
	public override resetAccountForm() {
		const password = this.accountForm().controls.password;
		password.reset();
		password.markAsPristine();
	}
	//endregion
}
