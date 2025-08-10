import {DestroyRef, Directive, ElementRef, HostListener, inject, input} from "@angular/core";
import {PlatformService} from "@services/platform.service";
import {debounceTime, filter, fromEvent, Subscription, timer} from "rxjs";
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
	public delayMs = input<number>(1000);
	public scrollDebounce = input<number>(100);
	private scrollSub?: Subscription;
	private isUserScroll = false;
	@HostListener("focus") onFocus(): void {
		this.focusHandler();
	}
	@HostListener("blur") onBlur(): void {
		this.cleanupScrollListener();
	}
	@HostListener("touchstart") onTouchStart(): void {
		this.isUserScroll = true;
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
			this.isUserScroll = false;
			timer(this.delayMs()).pipe(
				takeUntilDestroyed(this.destroyRef)
			).subscribe(() => {
				this.scrollSub = fromEvent(window, "scroll").pipe(
					debounceTime(this.scrollDebounce()),
					filter(() => this.isUserScroll && document.activeElement === element),
					takeUntilDestroyed(this.destroyRef)
				).subscribe(() => {
					element.blur();
					this.isUserScroll = false;
				});
			});
		});
	}
	//endregion
}
