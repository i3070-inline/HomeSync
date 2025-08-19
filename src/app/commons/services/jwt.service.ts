import {inject, Injectable, makeStateKey, REQUEST, StateKey, TransferState} from "@angular/core";
import {StorageFacadeService} from "@services/facade/storage-facade.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {PlatformService} from "@services/platform.service";
import {getCookieValueFromRequest} from "@utils/cookies-helper";

export const JWT_KEY = "jwt";

@Injectable({
	providedIn: "root"
})
export class JwtService {
	//region Members
	private readonly storage = inject(StorageFacadeService);
	private readonly jwtHelper = inject(JwtHelperService);
	private readonly transferState = inject(TransferState);
	private readonly platform = inject(PlatformService);
	private readonly jwtTokenKey: StateKey<string | null> = makeStateKey<string | null>("jwt-token");
	private readonly req = inject(REQUEST, {optional: true}) as Request | null;
	//endregion
	//region Methods
	private getToken(): string | null {
		if (this.transferState.hasKey(this.jwtTokenKey)) {
			const answer = this.transferState.get<string | null>(this.jwtTokenKey, null);
			this.storage.cookiesStorage.setItem(JWT_KEY, answer);
			return answer;
		}
		let token: string | null;
		if (this.platform.isServer() && this.req) {
			token = getCookieValueFromRequest(this.req, JWT_KEY);
			if (token) {
				this.transferState.set(this.jwtTokenKey, token);
			}
		}
		else {
			token = this.storage.cookiesStorage.getItem(JWT_KEY) || null;
		}
		return token;
	}
	public setToken(token: string): void {
		this.storage.cookiesStorage.setItem(JWT_KEY, token);
		this.transferState.set(this.jwtTokenKey, token);
	}
	public removeToken(): void {
		this.storage.cookiesStorage.removeItem(JWT_KEY);
		this.transferState.remove(this.jwtTokenKey);
	}
	private getTokenPayload(): any {
		const token = this.getToken();
		return token ? this.jwtHelper.decodeToken(token) : null;
	}
	public isTokenExpired(): boolean {
		const token = this.getToken();
		return token ? this.jwtHelper.isTokenExpired(token) : true;
	}
	public getUserId(): string | null {
		const payload = this.getTokenPayload();
		return payload?.sub || payload?.userId || null;
	}
	public getUserRoles(): string[] {
		const payload = this.getTokenPayload();
		return payload?.role || [];
	}
	public isAuthenticated(): boolean {
		return !this.isTokenExpired();
	}
	//endregion
}
