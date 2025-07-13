import {DestroyRef, inject, Injectable, signal} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IRegisterModel} from "@interfaces/register-model.interface";
import {Subject} from "rxjs";
import {matchPasswordValidator} from "@validators/input.validators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
	providedIn: "root"
})
export class RegisterService {
	//region Members
	private readonly formBuilder = inject(FormBuilder);
	private readonly destroyRef = inject(DestroyRef);
	private _beforeReg$ = new Subject<void>();
	private _afterReg$ = new Subject<{ success: boolean }>();
	public readonly beforeReg$ = this._beforeReg$.asObservable();
	public readonly afterReg$ = this._afterReg$.asObservable();
	public regForm = signal<FormGroup<IRegisterModel>>(this.createRegisterForm());
	//endregion
	//region Methods
	private createRegisterForm(): FormGroup<IRegisterModel> {
		const form = this.formBuilder.group<IRegisterModel>({
			username: new FormControl<string | null>(null, [Validators.required]),
			password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
			confirmPassword: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)])
		});
		form.controls.confirmPassword.addValidators([
			matchPasswordValidator(() => form.controls.password.value)
		]);
		form.controls.password.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				form.controls.confirmPassword.updateValueAndValidity({onlySelf: true, emitEvent: false});
			});
		return form;
	}
	public onSubmitRegForm(): void {
		this.regForm().markAllAsTouched();
		if (!this.regForm().valid) return;
		this._beforeReg$.next();
		this.onReg();
		this._afterReg$.next({success: true}); // This should be replaced with actual success status from register
	}
	public resetRegForm(): void {
		this.regForm().reset();
		this.regForm().markAsPristine();
		this.regForm().markAsUntouched();
	}
	public setStateRegForm(disabled: boolean): void {
		disabled ? this.regForm().disable() : this.regForm().enable();
	}
	public onReg(): void {
		//TODO: Implement authentication logic here
	}
	//endregion
}
