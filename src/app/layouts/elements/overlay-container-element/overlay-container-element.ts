import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal, ViewEncapsulation} from "@angular/core";
import {animate, AnimationEvent, state, style, transition, trigger} from "@angular/animations";
import {
	CdkConnectedOverlay,
	CdkOverlayOrigin,
	ConnectedPosition,
	ScrollStrategy,
	ScrollStrategyOptions
} from "@angular/cdk/overlay";
import {CdkTrapFocus} from "@angular/cdk/a11y";
import {OverlayContainerService} from "@services/overlay-container.service";
import {PlatformService} from "@services/platform.service";
import {getCssVariablesValue} from "@utils/dom-helper";
import {AnimationHandlerService} from "@services/animation-handler.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
	selector: "app-overlay-container-element",
	standalone: true,
	imports: [
		CdkConnectedOverlay,
		CdkTrapFocus
	],
	templateUrl: "./overlay-container-element.html",
	styleUrl: "./overlay-container-element.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("scaleAnimation", [
			state("open", style({transform: "scale(1)"})),
			state("close", style({transform: "scale(0)"})),
			state("void", style({transform: "scale(0)"})),
			transition("* <=> *", [
				animate("{{duration}} {{transition}}")
			], {params: {duration: "200ms", transition: "ease-in-out"}})
		])
	]
})
export class OverlayContainerElement {
	//region Members
	protected scrollStrategyOptions = inject(ScrollStrategyOptions);
	protected origin = inject(CdkOverlayOrigin);
	protected platformService = inject(PlatformService);
	protected overlayContainerService = inject(OverlayContainerService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly animationHandlerService = inject(AnimationHandlerService);
	protected transition = signal<string>(getCssVariablesValue(this.platformService, "transition-style") ?? "ease-in-out");
	protected duration = signal<string>(getCssVariablesValue(this.platformService, "transition-duration") ?? "0s");
	public backDropClasses = input<string[]>([]);
	public pointerEvents = input<"auto" | "none">("auto");
	public minWidth = input<string>("2rem");
	public maxWidth = input<string>("none");
	public minHeight = input<string>("2.6rem");
	public maxHeight = input<string>("none");
	public width = input<string>("max-content");
	public height = input<string>("max-content");
	public hasContainerBlur = input<boolean>(true);
	public hasBackDrop = input<boolean>(true);
	public hasContainerBackground = input<boolean>(false);
	public padding = input<string>((getCssVariablesValue(this.platformService, "standard-padding") ?? "0"));
	public scrollStrategies = input<ScrollStrategy>(this.scrollStrategyOptions.close());
	public positions = input<ConnectedPosition[]>([{
		originX: "center",
		originY: "bottom",
		overlayX: "center",
		overlayY: "top",
		offsetY: 5
	}]);
	//endregion
	//region Constructor
	constructor() {
		this.animationHandlerService.animationChanged$.pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(() => {
			this.transition.set(getCssVariablesValue(this.platformService, "transition-style") ?? "ease-in-out");
			this.duration.set(getCssVariablesValue(this.platformService, "transition-duration") ?? "0s");
		});
	}
	//endregion
	//region Methods
	protected onAnimationDone(event: AnimationEvent) {
		if (event.toState === "void" || event.toState === "close") this.overlayContainerService.isOpened.set(false);
	}
	//endregion
}
