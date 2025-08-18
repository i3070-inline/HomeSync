import {inject, Injectable, makeStateKey, REQUEST, StateKey, TransferState} from "@angular/core";
import {Translation, TranslocoLoader} from "@ngneat/transloco";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {PlatformService} from "@services/platform.service";

@Injectable({
	providedIn: "root"
})
export class TranslocoHttpLoader implements TranslocoLoader {
	//region Members
	private readonly http = inject(HttpClient);
	private readonly transferState = inject(TransferState);
	private readonly platform = inject(PlatformService);
	private readonly req = inject(REQUEST, {optional: true}) as Request | null;
	//endregion
	//#region Methods
	private getLanguageFromCookies(): string | null {
		if (!this.req) return null;
		const cookieHeader = this.req.headers.get("cookie") || "";
		const cookies = Object.fromEntries(
			cookieHeader
				.split(";")
				.map(c => c.trim().split("="))
				.map(([k, v]) => [k, decodeURIComponent(v)])
		);
		return cookies["lang"] || null;
	}
	public async getTranslation(lang: string) {
		let language = lang;
		if (this.platform.isServer() && this.req) {
			language = this.getLanguageFromCookies() || lang;
		}
		const key: StateKey<Translation> = makeStateKey<Translation>("transloco-" + language);
		if (this.transferState.hasKey(key)) {
			return this.transferState.get<Translation>(key, {});
		}
		const translation = await firstValueFrom(this.http.get<Translation>(`/assets/languages/${language}.json`));
		if (this.platform.isServer()) {
			this.transferState.set(key, translation);
		}
		return translation;
	}
	//#endregion
}