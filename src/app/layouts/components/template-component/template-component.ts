import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	input,
	signal,
	viewChild,
	ViewEncapsulation
} from "@angular/core";
import {SelectElement} from "@elements/select-element/select-element";
import {OverlayContainerElement} from "@elements/overlay-container-element/overlay-container-element";
import {OverlayDropdownClickDirective} from "@directives/overlay-dropdown-click.directive";
import {RouterLink} from "@angular/router";
import {TitleCasePipe} from "@angular/common";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {SettingsFacadeService} from "@services/facade/settings-facade.service";
import {TranslocoPipe} from "@ngneat/transloco";

@Component({
	selector: "app-template-component",
	standalone: true,
	imports: [
		SelectElement,
		OverlayContainerElement,
		OverlayDropdownClickDirective,
		RouterLink,
		TitleCasePipe,
		TranslocoPipe,
	],
	templateUrl: "./template-component.html",
	styleUrl: "./template-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent implements AfterViewInit {
	//region Members
	protected readonly uiService = inject(UiFacadeService);
	protected readonly settingsService = inject(SettingsFacadeService);
	private scrollContainer = viewChild<ElementRef>("scrollContainer");
	public headerHeight = input<number>(4.5);
	public footerHeight = input<number>(4);
	public isUsingScrollToTop = input<boolean>(true);
	public isUsingScrollToBottom = input<boolean>(false);
	public showTopScroll = signal<boolean>(false);
	public showBottomScroll = signal<boolean>(false);
	//endregion
	//region Methods
	public onScroll() {
		this.scrollHandler();
	}
	private scrollHandler() {
		const scrollContainer = this.scrollContainer()?.nativeElement;
		if (!scrollContainer) return;
		const [scrollTop, scrollHeight, clientHeight] = this.uiService.platformHandler.runMultipleOnBrowserPlatform(
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
		const scrollHeight = this.uiService.platformHandler.runOnBrowserPlatform(
			() => scrollContainer.scrollHeight);
		this.uiService.platformHandler.runOnBrowserPlatform(() => scrollContainer.scrollTo({
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
