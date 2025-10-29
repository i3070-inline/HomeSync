import {computed, Injectable, Signal, signal} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginModel} from "@interfaces/login-model.interface";
import {AccountBase} from "@services/base/account-base";
import {controlsOf} from "@constants/types";
import {strictEmailValidator} from "@validators/input.validators";
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
	public isRequestedLogout = signal(false);
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
			const user = await this.http.get<IUserModel>(restEndpoints.user.me);
			this._currentUser.set({
				...user,
				imageUrl: user.imageUrl ?? "alex"
			});
		}
		catch {
			this._currentUser.set(null);
		}
	}
	public async logout(): Promise<boolean> {
		try {
			await this.http.post(restEndpoints.user.logout, {}, {
					withCredentials: true,
					context: new HttpContext().set(BYPASS_REFRESH_INTERCEPTOR, true)
				},
				{
					message: this.langHelper.notificationAccount("FORGOT", "START")
				});
			this.removeToken();
			this._currentUser.set(null);
		}
		catch (error) {
			console.error("Logout failed:", error);
			return false;
		}
		return true;
	}
	//endregion
	//region Overrides
	public override get name(): Signal<string> {
		return signal("authentification");
	}
	protected override async onParticularExecution(): Promise<boolean> {
		try {
			const loginResult = await this.http.post<{ accessToken: string }>(
				restEndpoints.user.authentification,
				this.accountForm().value,
				{
					withCredentials: true,
					context: new HttpContext().set(BYPASS_REFRESH_INTERCEPTOR, true)
				},
				{
					message: this.langHelper.notificationAccount("SIGN_IN", "START")
				}
			);
			this.setToken(loginResult.accessToken);
		}
		catch (error) {
			console.error("Authentication failed:", error);
			return false;
		}
		return true;
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
