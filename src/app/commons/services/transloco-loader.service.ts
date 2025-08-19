import {inject, Injectable, makeStateKey, REQUEST, StateKey, TransferState} from "@angular/core";
import {Translation, TranslocoLoader} from "@ngneat/transloco";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {PlatformService} from "@services/platform.service";
import {getCookieValueFromRequest} from "@utils/cookies-helper";

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
	public async getTranslation(lang: string): Promise<Translation> {
		let language = lang;
		if (this.platform.isServer() && this.req) {
			language = getCookieValueFromRequest(this.req, "lang") || lang;
		}
		const key: StateKey<Translation> = makeStateKey<Translation>("transloco-" + language);
		if (this.transferState.hasKey(key)) {
			return this.transferState.get<Translation>(key, {});
		}
		const translation = await firstValueFrom(
			this.http.get<Translation>(`/assets/languages/${language}.json`)
		);
		if (this.platform.isServer()) {
			this.transferState.set(key, translation);
		}
		return translation;
	}
	//#endregion
}