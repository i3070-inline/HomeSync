import {DestroyRef, Directive, ElementRef, HostListener, inject, input} from "@angular/core";
import {PlatformService} from "@services/platform.service";
import {fromEvent, Subscription, timer} from "rxjs";
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
	private scrollSub?: Subscription;
	@HostListener("focus") onFocus(): void {
		this.focusHandler();
	}
	//endregion
	//region Methods
	private focusHandler(): void {
		this.platformService.runOnBrowserPlatform(() => {
			const element = this.elementRef.nativeElement;
			if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) return;
			this.scrollSub?.unsubscribe();
			timer(this.delayMs()).pipe(
				takeUntilDestroyed(this.destroyRef)
			).subscribe(() => {
				this.scrollSub = fromEvent(window, "scroll").pipe(
					takeUntilDestroyed(this.destroyRef)
				).subscribe(() => {
					element.blur();
				});
			});
		});
	}
	//endregion
}
