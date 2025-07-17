import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef, HostListener,
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
import {RegisterService} from "@services/register.service";
import {MediaQueryService} from "@services/media-query.service";
import {getCssVariablesValue} from "@utils/dom-helper";
import type {Swiper} from "swiper/types";
import {PlatformService} from "@services/platform.service";
import {AnimationHandlerService} from "@services/animation-handler.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SwiperModule} from "@swiper-angular";

type pagesType = "login" | "register";

@Component({
	selector: "app-login-page",
	standalone: true,
	imports: [
		TemplateComponent,
		AuthentificationComponent,
		RegisterComponent,
		SwiperModule
	],
	templateUrl: "./login-page.html",
	styleUrl: "./login-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("switchPageAnimation", [
			state("login", style({transform: "translateX(0)"})),
			state("register", style({transform: "translateX(-100%)"})),
			transition("login <=> register", [
				group([
					query("@circleLeftAnimation", animateChild(), {optional: true}),
					query("@circleRightAnimation", animateChild(), {optional: true}),
					query("@opacityTextAnimation", animateChild(), {optional: true}),
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
			state("login", style({left: "0%"})),
			state("register", style({left: "100%"})),
			transition("login <=> register", animate("{{duration}} {{transition}}"), {
				params: {
					duration: "0.5s",
					transition: "ease-in-out"
				}
			})]),
		trigger("circleRightAnimation", [
			state("login", style({right: "0%"})),
			state("register", style({right: "100%"})),
			transition("login <=> register", animate("{{duration}} {{transition}}"), {
				params: {
					duration: "0.5s",
					transition: "ease-in-out"
				}
			})]),
		trigger("opacityTextAnimation", [
			transition("login <=> register", [
				style({opacity: 1}),
				animate("0s", style({opacity: 0}))]
			)
		])
	]
})
export class LoginPage {
	//region Members
	private readonly destroyRef = inject(DestroyRef);
	private readonly animationHandlerService = inject(AnimationHandlerService);
	private readonly authService = inject(AuthentificationService);
	private readonly regService = inject(RegisterService);
	private readonly platformService = inject(PlatformService);
	protected readonly mediaQueryService = inject(MediaQueryService);
	protected currentPage = signal<pagesType>("login");
	protected duration = signal<string>(getCssVariablesValue(this.platformService, "medium-transition-duration") ?? "1s");
	protected transitionShoot = signal<string>(getCssVariablesValue(this.platformService, "transition-shoot-style") ?? "cubic-bezier(0.8, -0.25, 0.2, 1.25)");
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
	private count = 0
	@HostListener("window:resize")onResize() {
		console.log("Resize event triggered");
		this.authService.authForm().patchValue({ username: `Salut, ${this.count}!` });
		this.count++;
	}
	//endregion
	//region Constructor
	constructor() {
		this.animationHandlerService.animationChanged$.pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(() => {
			this.duration.set(getCssVariablesValue(this.platformService, "medium-transition-duration") ?? "1s");
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
		this.currentPage.set(this.currentPage() === "login" ? "register" : "login");
	}
	protected onAnimationStart(): void {
		this.setFormsState(true);
	}
	protected onAnimationDone(event: AnimationEvent): void {
		if (event.toState === "login") {
			this.authService.setStateAuthForm(false);
		}
		else if (event.toState === "register") {
			this.regService.setStateRegForm(false);
		}
		else if (event.toState === "void") {
			this.setFormsState(false);
		}
	}
	private setFormsState(disable: boolean): void {
		this.authService.setStateAuthForm(disable);
		this.regService.setStateRegForm(disable);
	}
	protected onSwipeChanged(event: [swiper: Swiper]) {
		const swiper = event[0];
		console.log(swiper);
		if (swiper.realIndex === 0) {
			this.currentPage.set("login");
			this.authService.setStateAuthForm(false);
			this.regService.setStateRegForm(true);
		}
		else if (swiper.realIndex === 1) {
			this.currentPage.set("register");
			this.regService.setStateRegForm(false);
			this.authService.setStateAuthForm(true);
		}
	}
	//endregion
	//region Overrides
	//endregion
}
