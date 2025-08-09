import {Signal, signal} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ControlsOf} from "@constants/types";

export abstract class AccountBase<T extends object> {
	//region Members
	public abstract get name() : Signal<string>;
	public abstract accountForm: Signal<FormGroup<ControlsOf<T>>>;
	public isExecuting = signal<boolean>(false);
	//endregion
	//region Methods
	public isFormValid(): boolean {
		this.accountForm().markAllAsDirty();
		return this.accountForm().valid;
	}
	public resetAccountForm(): void {
		this.accountForm().reset();
	}
	public setStateAccountForm(disabled: boolean): void {
		disabled ? this.accountForm().disable() : this.accountForm().enable();
	}
	public async onGenericExecution(): Promise<boolean> {
		this.setStateAccountForm(true);
		this.isExecuting.set(true);
		const result = await this.onParticularExecution();
		this.setStateAccountForm(false);
		this.isExecuting.set(false);
		return result;
	}
	protected abstract onParticularExecution(): Promise<boolean>;
	//endregion
}
