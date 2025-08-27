import {inject, Injectable, signal} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IJwtPayloadModel} from "@interfaces/jwt-payload-model.interface";

@Injectable({
	providedIn: "root"
})
export class JwtService {
	//region Members
	private readonly jwtHelper = inject(JwtHelperService);
	private accessToken = signal<string | null>(null);
	//endregion
	//region Methods
	public getToken(): string | null {
		return this.accessToken();
	}
	public setToken(token: string): void {
		this.accessToken.set(token);
	}
	public removeToken(): void {
		this.accessToken.set(null);
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
