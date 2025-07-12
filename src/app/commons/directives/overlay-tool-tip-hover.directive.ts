import {Directive, HostListener, input} from "@angular/core";
import {OverlayBaseDirective} from "@directives/base/overlay-base.directive";

@Directive({
	selector: "[appOverlayToolTipHover]"
})
export class OverlayToolTipHoverDirective extends OverlayBaseDirective {
	//region Listeners
	@HostListener("mouseenter") onShow(): void {
		this.show();
	}
	@HostListener("mouseleave") onHide(): void {
		this.hide();
	}
	//endregion
	//region Overrides
	override openDelayMs = input<number>(2000);
	//endregion
}