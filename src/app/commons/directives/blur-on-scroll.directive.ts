import {Directive, ElementRef, HostListener, inject} from "@angular/core";
import {PlatformService} from "@services/platform.service";

@Directive({
	selector: "[appBlurOnScrollDirective]",
	standalone: true
})
export class BlurOnScrollDirective {
	//region Members
	private readonly elementRef = inject(ElementRef);
	private readonly platformService = inject(PlatformService);
	@HostListener("window:scroll") onScroll(): void {
		this.scrollHandler();
	}
	//endregion
	//region Methods
	private scrollHandler(): void {
		const el = this.elementRef.nativeElement;
		if (!el) return;
		this.platformService.runOnBrowserPlatform(() => {
			if (document.activeElement !== el) return;
			el.blur();
		});
	}
	//endregion
}
