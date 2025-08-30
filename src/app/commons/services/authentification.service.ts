import {computed, Injectable, OnInit, Signal, signal} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginModel} from "@interfaces/login-model.interface";
import {AccountBase} from "@services/base/account-base";
import {controlsOf} from "@constants/types";
import {strictEmailValidator} from "@validators/input.validators";
import {firstValueFrom} from "rxjs";
import {restEndpoints} from "@rest/rest-endpoints";
import {BYPASS_REFRESH_INTERCEPTOR} from "@interceptors/auth-refresh.interceptor";
import {HttpContext} from "@angular/common/http";
import {IUserModel} from "@models/user.model.interface";

@Injectable({
	providedIn: "root"
})
export class AuthentificationService extends AccountBase<ILoginModel> {
	//region Members
	private _currentUser = signal<IUserModel | null>(null);
	private _accessToken = signal<string | null>(null);
	public currentUser = computed(() => this._currentUser());
	public accessToken = computed(() => this._accessToken());
	//endregion
	//region Methods
	public setToken(token: string): void {
		this._accessToken.set(token);
	}
	public removeToken(): void {
		this._accessToken.set(null);
	}
	public isAuthenticated(): boolean {
		return this.accessToken() !== null;
	}
	public async loadCurrentUser(): Promise<void> {
		try {
			const user = await firstValueFrom(this.http.get<IUserModel>(restEndpoints.user.me));
			this._currentUser.set(user);
		}
		catch {
			this._currentUser.set(null);
		}
	}
	public async logout(): Promise<{ successful: boolean }> {
		try {
			await firstValueFrom(this.http.post(restEndpoints.user.logout, {}, {
				withCredentials: true,
				context: new HttpContext().set(BYPASS_REFRESH_INTERCEPTOR, true)
			}));
			this.removeToken();
			this._currentUser.set(null);
		}
		catch (error) {
			console.error("Logout failed:", error);
			return {successful: false};
		}
		return {successful: true};
	}
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
			const loginResult = await firstValueFrom(
				this.http.post<{
					accessToken: string
				}>(restEndpoints.user.authentification, this.accountForm().value, {
					withCredentials: true,
					context: new HttpContext().set(BYPASS_REFRESH_INTERCEPTOR, true)
				}));
			this.setToken(loginResult.accessToken);
			await this.loadCurrentUser();
		}
		catch (error) {
			console.error("Authentication failed:", error);
			return {successful: false};
		}
		return {successful: true};
	}
	public override accountForm = signal<FormGroup<controlsOf<ILoginModel>>>(
		new FormGroup<controlsOf<ILoginModel>>({
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
