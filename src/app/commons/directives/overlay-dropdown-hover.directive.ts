import {Directive, HostListener} from "@angular/core";
import {AccessibilityDirective} from "@directives/accessibility.directive";
import {OverlayBaseDirective} from "@directives/base/overlay-base.directive";
import {OverlayContainerService} from "@services/overlay-container.service";

@Directive({
	selector: "[appOverlayDropdownHover]",
	standalone: true,
	providers: [OverlayContainerService],
	hostDirectives : [{
		directive : AccessibilityDirective,
		inputs: ["tabIndex", "role"]
	}],
	exportAs: "overlayDropdownClickExport"
})
export class OverlayDropdownHoverDirective extends OverlayBaseDirective {
	//region Listeners
	@HostListener("mouseenter") onShow(): void {
		this.show();
	}
	//endregion
}