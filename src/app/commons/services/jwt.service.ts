import {inject, Injectable, makeStateKey, REQUEST, StateKey, TransferState} from "@angular/core";
import {StorageFacadeService} from "@services/facade/storage-facade.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {PlatformService} from "@services/platform.service";
import {getCookieValueFromRequest} from "@utils/cookies-helper";
import {IJwtPayloadModel} from "@interfaces/jwt-payload-model.interface";

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
	public getToken(): string | null {
		try {
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
		catch (error) {
			console.error("Failed to get token from storage:", error);
			return null;
		}
	}
	public setToken(token: string): void {
		try {
			this.storage.cookiesStorage.setItem(JWT_KEY, token);
			this.transferState.set(this.jwtTokenKey, token);
		}
		catch (error) {
			console.error("Failed to set token in storage:", error);
			throw error;
		}
	}
	public removeToken(): void {
		try {
			this.storage.cookiesStorage.removeItem(JWT_KEY);
			this.transferState.remove(this.jwtTokenKey);
		}
		catch (error) {
			console.error("Failed to remove token from storage:", error);
			throw error;
		}
	}
	public getTokenPayload(token: string | null = null): IJwtPayloadModel | null {
		const actualToken = token ?? this.getToken();
		return actualToken ? this.jwtHelper.decodeToken(actualToken) as IJwtPayloadModel : null;
	}
	public isTokenExpired(token: string | null = null): boolean {
		return this.jwtHelper.isTokenExpired(token ?? this.getToken());
	}
	//endregion
}
