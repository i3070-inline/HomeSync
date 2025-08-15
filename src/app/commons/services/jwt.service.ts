import {inject, Injectable} from "@angular/core";
import {StorageFacadeService} from "@services/facade/storage-facade.service";
import {JwtHelperService} from "@auth0/angular-jwt";

export const JWT_KEY = "jwt";

@Injectable({
	providedIn: "root"
})
export class JwtService {
	//region Members
	private readonly storage = inject(StorageFacadeService);
	private readonly jwtHelper = inject(JwtHelperService);
	//endregion
	//region Methods
	private getToken(): string | undefined {
		return this.storage.localStorage.getItem(JWT_KEY);
	}
	private getTokenPayload(): any {
		const token = this.getToken();
		return token ? this.jwtHelper.decodeToken(token) : null;
	}
	public isTokenExpired(): boolean {
		const token = this.getToken();
		return token ? this.jwtHelper.isTokenExpired(token) : true;
	}
	public setToken(token: string): void {
		this.storage.localStorage.setItem(JWT_KEY, token);
	}
	public removeToken(): void {
		this.storage.localStorage.removeItem(JWT_KEY);
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
