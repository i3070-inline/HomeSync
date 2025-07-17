import {AfterViewInit, DestroyRef, Directive, ElementRef, inject} from "@angular/core";
import {PlatformService} from "@services/platform.service";
import {debounceTime, filter, fromEvent, Subscription} from "rxjs";
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
			fromEvent(window, "scroll")
				.pipe(
					takeUntilDestroyed(this.destroyRef),
					debounceTime(500),
					filter(() => document.activeElement === this.elementRef.nativeElement)
				)
				.subscribe(() => {
					this.elementRef.nativeElement.blur();
				});
		});
	}
	//endregion
}
