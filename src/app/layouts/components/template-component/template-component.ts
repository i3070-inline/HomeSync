import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	inject,
	input,
	signal,
	viewChild,
	ViewEncapsulation
} from "@angular/core";
import {applicationDetails} from "@constants/constants";
import {PlatformService} from "@services/platform.service";
import {SelectElement} from "@elements/select-element/select-element";
import {OverlayContainerElement} from "@elements/overlay-container-element/overlay-container-element";
import {OverlayDropdownClickDirective} from "@directives/overlay-dropdown-click.directive";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {TitleCasePipe} from "@angular/common";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {ThemeHandlerService} from "@services/theme-handler.service";
import {AnimationHandlerService} from "@services/animation-handler.service";
import {LanguageHandlerService} from "@services/language-handler.service";

@Component({
	selector: "app-template-component",
	standalone: true,
	imports: [
		SelectElement,
		OverlayContainerElement,
		OverlayDropdownClickDirective,
		RouterLink,
		TranslatePipe,
		TitleCasePipe
	],
	templateUrl: "./template-component.html",
	styleUrl: "./template-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent implements AfterViewInit {
	//region Members
	protected readonly applicationDetails = applicationDetails;
	protected readonly buildIconSvgPath = buildIconSvgPath;
	protected platformService = inject(PlatformService);
	protected themeService = inject(ThemeHandlerService);
	protected animationService = inject(AnimationHandlerService);
	protected languageService = inject(LanguageHandlerService);
	private scrollContainer = viewChild<ElementRef>("scrollContainer");
	public headerHeight = input<number>(4.5);
	public footerHeight = input<number>(4);
	public isUsingScrollToTop = input<boolean>(true);
	public isUsingScrollToBottom = input<boolean>(false);
	public showTopScroll = signal<boolean>(true);
	public showBottomScroll = signal<boolean>(true);
	@HostBinding("style.--header-height.rem")
	get headerHeightValue() {
		return this.headerHeight();
	}
	@HostBinding("style.--footer-height.rem")
	get footerHeightValue() {
		return this.footerHeight();
	}
	//endregion
	//region Methods
	public onScroll() {
		this.scrollHandler();
	}
	private scrollHandler() {
		const scrollContainer = this.scrollContainer()?.nativeElement;
		if (!scrollContainer) return;
		const [scrollTop, scrollHeight, clientHeight] = this.platformService.runMultipleOnBrowserPlatform(
			() => scrollContainer.scrollTop,
			() => scrollContainer.scrollHeight,
			() => scrollContainer.clientHeight);
		if (scrollTop === undefined || scrollHeight === undefined || clientHeight === undefined) return;
		const isScrollable = scrollHeight > clientHeight;
		this.showTopScroll.set(scrollTop <= this.headerHeight() && isScrollable && this.isUsingScrollToBottom());
		this.showBottomScroll.set((scrollTop + clientHeight >= scrollHeight - this.footerHeight()) && isScrollable && this.isUsingScrollToTop());
	}
	protected scroll(direction: "top" | "bottom") {
		const scrollContainer = this.scrollContainer()?.nativeElement;
		if (!scrollContainer) return;
		const scrollHeight = this.platformService.runOnBrowserPlatform(
			() => scrollContainer.scrollHeight);
		this.platformService.runOnBrowserPlatform(() => scrollContainer.scrollTo({
			top: direction === "top" ? 0 : scrollHeight ?? 0,
			behavior: "smooth"
		}));
	}
	//endregion
	//region Overrides
	public ngAfterViewInit(): void {
		this.scrollHandler();
	}
	//endregion
}
