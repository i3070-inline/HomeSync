import {Directive, input} from "@angular/core";

@Directive({
	selector: "[appAccessibility]",
	standalone: true,
	host: {
		"[attr.tabindex]": "tabIndex()",
		"[attr.role]": "role()",
		"[style.cursor]": "'pointer'"
	}
})
export class AccessibilityDirective {
	//region Members
	public tabIndex = input<number>(0);
	public role = input<string>("button");
	//endregion
}