import {DestroyRef, Directive, ElementRef, HostListener, inject, input} from "@angular/core";
import {PlatformService} from "@services/platform.service";
import {debounceTime, filter, fromEvent, Subscription} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Directive({
	selector: "[appBlurOnScrollDirective]",
	standalone: true
})
export class BlurOnScrollDirective {
	//region Members
	private readonly elementRef = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);
	private readonly platformService = inject(PlatformService);
	private readonly destroyRef = inject(DestroyRef);
	public delayMs = input<number>(500);
	public scrollThreshold = input<number>(15);
	private scrollSub?: Subscription;
	private lastScrollY = 0;
	@HostListener("focus") onFocus(): void {
		this.focusHandler();
	}
	@HostListener("blur") onBlur(): void {
		this.cleanupScrollListener();
	}
	//endregion
	//region Methods
	private cleanupScrollListener(): void {
		if (!this.scrollSub) return;
		this.scrollSub.unsubscribe();
		this.scrollSub = undefined;
	}
	private focusHandler(): void {
		this.platformService.runOnBrowserPlatform(() => {
			const element = this.elementRef.nativeElement;
			if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) return;
			this.cleanupScrollListener();
			this.lastScrollY = window.scrollY;
			this.scrollSub = fromEvent(window, "scroll").pipe(
				debounceTime(100),
				filter(() => {
					if (document.activeElement !== element) return false;
					const currentScrollY = window.scrollY;
					const scrollDifference = Math.abs(currentScrollY - this.lastScrollY);
					const direction = currentScrollY - this.lastScrollY;
					this.lastScrollY = currentScrollY;
					if (direction < 0 && scrollDifference < this.scrollThreshold() * 1.5) {
						return false;
					}
					return scrollDifference > this.scrollThreshold();
				}),
				takeUntilDestroyed(this.destroyRef)
			).subscribe(() => {
				element.blur();
			});
		});
	}
	//endregion
}
