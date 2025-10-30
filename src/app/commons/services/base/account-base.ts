import {inject, Signal, signal} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {controlsOf} from "@constants/types";
import {HttpNotify} from "@rest/http-notify.service";
import {LangHelper} from "@utils/lang-helper";

export abstract class AccountBase<T extends object> {
	//region Members
	public abstract get name(): Signal<string>;
	public abstract accountForm: Signal<FormGroup<controlsOf<T>>>;
	public isExecuting = signal<boolean>(false);
	protected readonly http = inject(HttpNotify);
	protected readonly langHelper = LangHelper;
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
	public async onGenericExecution<T extends Record<string, unknown>>(): Promise<boolean> {
		this.isExecuting.set(true);
		const result = await this.onParticularExecution();
		this.isExecuting.set(false);
		return result;
	}
	protected abstract onParticularExecution(): Promise<boolean>;
	//endregion
}
