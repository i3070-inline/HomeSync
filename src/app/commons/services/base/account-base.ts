import {inject, Signal, signal} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {controlsOf} from "@constants/types";
import {RestBaseService} from "@rest/rest-base.service";

export abstract class AccountBase<T extends object> {
	//region Members
	public abstract get name(): Signal<string>;
	public abstract accountForm: Signal<FormGroup<controlsOf<T>>>;
	public isExecuting = signal<boolean>(false);
	protected readonly http = inject(RestBaseService);
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
	public async onGenericExecution<T extends Record<string, unknown>>(): Promise<{
		successful: boolean;
		data?: T;
	}> {
		this.isExecuting.set(true);
		const result = await this.onParticularExecution();
		this.isExecuting.set(false);
		return result as { successful: boolean; data?: T };
	}
	protected abstract onParticularExecution(): Promise<{
		successful: boolean;
		data?: Record<string, unknown>;
	}>;
	//endregion
}
