import {Inject, inject, Injectable, makeStateKey, Optional, signal, TransferState} from "@angular/core";
import {PlatformService} from "@services/platform.service";
import {animationType, languageType, themeType} from "@constants/types";

@Injectable({
	providedIn: "root"
})
export class CookiesSettingsService {
	//region Members
	private readonly transferState = inject(TransferState);
	private readonly platform = inject(PlatformService);
	public readonly langKey = makeStateKey<string>("language");
	public readonly themeKey = makeStateKey<string>("theme");
	public readonly animationKey = makeStateKey<string>("animation");
	public readonly langCookiesValue = signal<languageType>("en");
	public readonly animCookiesValue = signal<animationType>("system");
	public readonly themCookiesValue = signal<themeType>("system");
	//endregion
	//region Methods
	private getValues(): void {
		if (this.platform.isServer()) {
			// На сервере: сохраняем значения из токенов в TransferState
			this.langCookiesValue.set((this.lang || "en") as languageType);
			this.animCookiesValue.set((this.anim || "system") as animationType);
			this.themCookiesValue.set((this.theme || "system") as themeType);

			this.transferState.set(this.langKey, this.langCookiesValue());
			this.transferState.set(this.animationKey, this.animCookiesValue());
			this.transferState.set(this.themeKey, this.themCookiesValue());
		} else {
			// На клиенте: получаем значения из TransferState
			this.langCookiesValue.set(this.transferState.get(this.langKey, "ro") as languageType);
			this.animCookiesValue.set(this.transferState.get(this.animationKey, "system") as animationType);
			this.themCookiesValue.set(this.transferState.get(this.themeKey, "system") as themeType);
		}
	}
	//endregion
	constructor(
		@Inject("LANGUAGE") @Optional() private readonly lang: string,
		@Inject("ANIMATION") @Optional() private readonly anim: string,
		@Inject("THEME") @Optional() private readonly theme: string
	) {
		console.log("SettingsService инициализирован:", {
			lang: this.langCookiesValue(),
			theme: this.themCookiesValue(),
			animation: this.animCookiesValue()
		});
	}
}
