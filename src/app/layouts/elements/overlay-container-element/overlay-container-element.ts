import {ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation} from "@angular/core";
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

@Component({
	selector: "app-overlay-container-element",
	standalone: true,
	imports: [
		CdkConnectedOverlay,
		CdkTrapFocus
	],
	templateUrl: "./overlay-container-element.html",
	styleUrl: "./overlay-container-element.scss",
	providers: [OverlayContainerService],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayContainerElement {
	//region Members
	protected scrollStrategyOptions = inject(ScrollStrategyOptions);
	protected origin = inject(CdkOverlayOrigin);
	protected platformService = inject(PlatformService);
	public overlayContainerService = inject(OverlayContainerService);
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
}
