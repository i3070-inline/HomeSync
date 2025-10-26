import {Directive, HostListener} from "@angular/core";
import {AccessibilityDirective} from "@directives/accessibility.directive";
import {OverlayBaseDirective} from "@directives/base/overlay-base.directive";

@Directive({
	selector: "[appOverlayDropdownClick]",
	standalone: true,
	hostDirectives: [{
		directive: AccessibilityDirective,
		inputs: ["tabIndex", "role"]
	}],
	exportAs: "appOverlayDropdownClickExport"
})
export class OverlayDropdownClickDirective extends OverlayBaseDirective {
	//region Listeners
	@HostListener("click") onShow(): void {
		this.show();
	}
	//endregion
}