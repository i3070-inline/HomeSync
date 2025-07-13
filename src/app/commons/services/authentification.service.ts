import {inject, Injectable, signal} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginModel} from "@interfaces/login-model.interface";
import {Subject} from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AuthentificationService {
	//region Members
	private formBuilder = inject(FormBuilder);
	public authForm = signal<FormGroup<ILoginModel>>(
		this.formBuilder.group<ILoginModel>({
			username: new FormControl<string | null>(null, [Validators.required]),
			password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)])
		})
	);
	public beforeAuth$ = new Subject<void>();
	public afterAuth$ = new Subject<{ success: boolean }>();
	//endregion
	//region Methods
	public onSubmitAuthForm(): void {
		this.authForm().markAllAsTouched();
		if (!this.authForm().valid) return;
		this.beforeAuth$.next();
		this.onAuth();
		this.afterAuth$.next({success: true}); // This should be replaced with actual success status from authentication logic
	}
	public resetAuthForm(): void {
		this.authForm().reset();
		this.authForm().markAsPristine();
		this.authForm().markAsUntouched();
	}
	public setStateAuthForm(disabled: boolean): void {
		disabled ? this.authForm().disable() : this.authForm().enable();
	}
	public onAuth(): void {
		//TODO: Implement authentication logic here
	}
	//endregion
}
