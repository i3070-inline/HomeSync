import {DestroyRef, Directive, ElementRef, HostListener, inject, input} from "@angular/core";
import {PlatformService} from "@services/platform.service";
import {filter, fromEvent, timer} from "rxjs";
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
	@HostListener("focus") onFocus(): void {
		this.focusHandler();
	}
	//endregion
	//region Methods
	private focusHandler(): void {
		this.platformService.runOnBrowserPlatform(() => {
			const element = this.elementRef.nativeElement;
			if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) return;
			timer(this.delayMs()).pipe(
				takeUntilDestroyed(this.destroyRef)
			).subscribe(() => {
				fromEvent(window, "scroll").pipe(
					takeUntilDestroyed(this.destroyRef),
					filter(() => document.activeElement === element)
				).subscribe(() => {
					element.blur();
				});
			});
		});
	}
	//endregion
}
