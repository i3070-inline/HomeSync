import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	inject,
	signal,
	ViewEncapsulation
} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";
import {AuthentificationComponent} from "@components/authentification-component/authentification-component";
import {RegisterComponent} from "@components/register-component/register-component";
import {
	animate,
	animateChild,
	AnimationEvent,
	group,
	query,
	state,
	style,
	transition,
	trigger
} from "@angular/animations";
import {AuthentificationService} from "@services/authentification.service";
import {RegistrationService} from "@services/registration.service";
import {MediaQueryService} from "@services/media-query.service";
import {getCssVariablesValue} from "@utils/dom-helper";
import type {Swiper} from "swiper/types";
import {PlatformService} from "@services/platform.service";
import {AnimationHandlerService} from "@services/animation-handler.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SwiperModule} from "@swiper-angular";
import {TranslatePipe} from "@ngx-translate/core";
import {AccountBase} from "@services/base/account-base";

@Component({
	selector: "app-login-page",
	standalone: true,
	imports: [
		TemplateComponent,
		AuthentificationComponent,
		RegisterComponent,
		SwiperModule,
		TranslatePipe
	],
	templateUrl: "./login-page.html",
	styleUrl: "./login-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("switchPageAnimation", [
			state("authentification", style({transform: "translateX(0)"})),
			state("registration", style({transform: "translateX(-100%)"})),
			transition("authentification <=> registration", [
				group([
					query("@circleLeftAnimation", animateChild(), {optional: true}),
					query("@circleRightAnimation", animateChild(), {optional: true}),
					animate("{{duration}} {{transition}}")
				])
			], {
				params: {
					duration: "1s",
					transition: "ease-in-out"
				}
			})
		]),
		trigger("circleLeftAnimation", [
			state("authentification", style({left: "0%"})),
			state("registration", style({left: "100%"})),
			transition("authentification <=> registration", animate("{{duration}} {{transition}}"), {
				params: {
					duration: "0.5s",
					transition: "ease-in-out"
				}
			})]),
		trigger("circleRightAnimation", [
			state("authentification", style({right: "0%"})),
			state("registration", style({right: "100%"})),
			transition("authentification <=> registration", animate("{{duration}} {{transition}}"), {
				params: {
					duration: "0.5s",
					transition: "ease-in-out"
				}
			})])
	]
})
export class LoginPage {
	//region Members
	private readonly destroyRef = inject(DestroyRef);
	private readonly platformService = inject(PlatformService);
	private readonly animationHandlerService = inject(AnimationHandlerService);
	protected readonly regService = inject(RegistrationService);
	protected readonly mediaQueryService = inject(MediaQueryService);
	protected readonly authService = inject(AuthentificationService);
	protected currentForm = signal<AccountBase<any>>(this.authService);
	protected duration = signal<string>(getCssVariablesValue(this.platformService, "medium-transition-duration") ?? "0s");
	protected transitionShoot = signal<string>(getCssVariablesValue(this.platformService, "transition-shoot-style") ?? "cubic-bezier(0.8, -0.25, 0.2, 1.25)");
	protected isSwitching = signal<boolean>(false);
	protected circleDuration = computed<string>(() => {
		const duration = parseFloat(this.duration());
		return duration ? `${duration / 1.1}s` : "0s";
	});
	protected speedSwiper = signal<number | undefined>(
		(() => {
			const result = getCssVariablesValue(this.platformService, "transition-duration") || undefined;
			return result ? parseFloat(result) * 1000 : undefined;
		})()
	);
	//endregion
	//region Constructor
	constructor() {
		this.animationHandlerService.animationChanged$.pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(() => {
			this.duration.set(getCssVariablesValue(this.platformService, "medium-transition-duration") ?? "0s");
			this.transitionShoot.set(getCssVariablesValue(this.platformService, "transition-shoot-style") ?? "cubic-bezier(0.8, -0.25, 0.2, 1.25)");
			this.speedSwiper.set(
				(() => {
					const result = getCssVariablesValue(this.platformService, "transition-duration") || undefined;
					return result ? parseFloat(result) * 1000 : undefined;
				})()
			);
		});
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
	protected onAnimationDone(event: AnimationEvent): void {
		this.isSwitching.set(false);
	}
	protected onSwipeChanged(event: [swiper: Swiper]) {
		const swiper = event[0];
		switch (swiper.realIndex) {
			case 0:
				this.currentForm.set(this.authService);
				break;
			case 1:
				this.currentForm.set(this.regService);
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
	//endregion
}
