import {ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";
import {AuthentificationComponent} from "@components/authentification-component/authentification-component";
import {RegisterComponent} from "@components/register-component/register-component";
import {AuthentificationService} from "@services/authentification.service";
import {RegistrationService} from "@services/registration.service";
import {getCssVariablesValue} from "@utils/dom-helper";
import type {Swiper} from "swiper/types";
import {SwiperModule} from "@swiper-angular";
import {AccountBase} from "@services/base/account-base";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {TranslocoPipe} from "@ngneat/transloco";
import {LangHelper} from "@utils/lang-helper";

@Component({
	selector: "app-login-page",
	standalone: true,
	imports: [
		TemplateComponent,
		AuthentificationComponent,
		RegisterComponent,
		SwiperModule,
		TranslocoPipe
	],
	templateUrl: "./login-page.html",
	styleUrl: "./login-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
	//region Members
	protected readonly langHelper = LangHelper;
	protected readonly regService = inject(RegistrationService);
	protected readonly uiService = inject(UiFacadeService);
	protected readonly authService = inject(AuthentificationService);
	protected currentForm = signal<AccountBase<any>>(this.authService);
	protected isSwitching = signal<boolean>(false);
	protected speedSwiper = signal<number | undefined>(
		(() => {
			const result = getCssVariablesValue(this.uiService.platformHandler, "transition-duration") || undefined;
			return result ? parseFloat(result) * 1000 : undefined;
		})()
	);
	//endregion
	//region Constructor
	constructor() {
		this.regService.setStateAccountForm(true);
	}
	//endregion
	//region Methods
	protected onSwitchPage() {
		this.isSwitching.set(true);
		switch (this.currentForm()) {
			case this.authService:
				this.setCurrentForm(this.regService);
				break;
			case this.regService:
				this.setCurrentForm(this.authService);
				break;
			default:
				this.isSwitching.set(false);
				return;
		}
	}
	protected onSwipeChanged(event: [swiper: Swiper]) {
		const swiper = event[0];
		switch (swiper.realIndex) {
			case 0:
				this.setCurrentForm(this.authService);
				break;
			case 1:
				this.setCurrentForm(this.regService);
				break;
			default:
				return;
		}
	}
	private setCurrentForm(form: AccountBase<any>) {
		this.currentForm().setStateAccountForm(true);
		this.currentForm.set(form);
		this.currentForm().setStateAccountForm(false);
	}
	public onTransitionEnd(event: TransitionEvent) {
		if (event.propertyName !== "transform" || event.target !== event.currentTarget) return;
		this.isSwitching.set(false);
	}
	//endregion
}
