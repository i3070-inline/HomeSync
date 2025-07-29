import {inject, Injectable, signal} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginModel} from "@interfaces/login-model.interface";

@Injectable({
	providedIn: "root"
})
export class AuthentificationService {
	//region Members
	private readonly formBuilder = inject(FormBuilder);
	public authForm = signal<FormGroup<ILoginModel>>(
		this.formBuilder.group<ILoginModel>({
			username: new FormControl<string | null>(null, [Validators.required]),
			password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)])
		})
	);
	//endregion
	//region Methods
	public isAuthFormValid(): boolean {
		this.authForm().markAllAsTouched();
		return this.authForm().valid;
	}
	public handlerAfterSuccessAuth(): void {
		const password = this.authForm().controls.password;
		password.reset();
		password.markAsPristine();
		password.markAsUntouched();
	}
	public setStateAuthForm(disabled: boolean): void {
		disabled ? this.authForm().disable() : this.authForm().enable();
	}
	public async onAuth(): Promise<void> {
		await new Promise(resolve => setTimeout(resolve, 500));
		// TODO: Implement authentication logic here
	}
	//endregion
}
