import {AfterViewInit, DestroyRef, Directive, inject, input} from "@angular/core";
import {CdkOverlayOrigin} from "@angular/cdk/overlay";
import {OverlayContainerService} from "@services/overlay-container.service";
import {Subject, switchMap, take, takeUntil, timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Directive({
	standalone: true,
	hostDirectives: [CdkOverlayOrigin]
})
export class OverlayBaseDirective implements AfterViewInit {
	//region Members
	protected readonly destroyRef = inject(DestroyRef);
	public readonly overlayContainerService = inject(OverlayContainerService);
	public openDelayMs = input<number>(0);
	private showSubject = new Subject<void>();
	private hideSubject = new Subject<void>();
	//endregion
	//region Methods
	protected show(): void {
		this.showSubject.next();
	}
	protected hide(): void {
		this.hideSubject.next();
	}
	//endregion
	//region Overrides
	ngAfterViewInit(): void {
		this.showSubject.pipe(
			takeUntilDestroyed(this.destroyRef),
			switchMap(() => {
				return timer(this.openDelayMs()).pipe(
					takeUntil(this.hideSubject),
					takeUntilDestroyed(this.destroyRef),
					take(1)
				);
			})
		).subscribe(() => {
			if (!this.overlayContainerService.isOpened()) {
				this.overlayContainerService.show();
				return;
			}
			this.overlayContainerService.hide();
		});
		this.hideSubject.pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(() => {
			this.overlayContainerService.hide();
		});
	}
	//endregion
}