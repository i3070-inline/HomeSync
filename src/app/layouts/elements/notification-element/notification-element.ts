import {ChangeDetectionStrategy, Component, input, ViewEncapsulation} from "@angular/core";
import {NgClass} from "@angular/common";

@Component({
	selector: "app-notification-element",
	standalone: true,
	imports: [
		NgClass
	],
	templateUrl: "./notification-element.html",
	styleUrl: "./notification-element.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationElement {
	//region Members
	public count = input.required<number>();
	public maxDisplayCount = input<number>(99);
	public position = input<"top-left" | "top-right" | "bottom-left" | "bottom-right">("top-right");
	//endregion
}