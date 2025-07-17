import {AfterViewInit, DestroyRef, Directive, ElementRef, inject} from "@angular/core";
import {PlatformService} from "@services/platform.service";
import {debounceTime, filter, fromEvent, skipUntil, Subscription, switchMap, timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Directive({
	selector: "[appBlurOnScrollDirective]",
	standalone: true
})
export class BlurOnScrollDirective implements AfterViewInit {
	//region Members
	private readonly elementRef = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);
	private readonly platformService = inject(PlatformService);
	private readonly destroyRef = inject(DestroyRef);
	//endregion
	//region Overrides
	ngAfterViewInit(): void {
		this.platformService.runOnBrowserPlatform(() => {
			const element = this.elementRef.nativeElement;
			if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) return;
			timer(500)
				.pipe(
					takeUntilDestroyed(this.destroyRef),
					switchMap(() =>
						fromEvent(window, "scroll").pipe(
							filter(() => document.activeElement === element)
						)
					)
				)
				.subscribe(() => {
					element.blur();
				});
		});
	}
	//endregion
}
