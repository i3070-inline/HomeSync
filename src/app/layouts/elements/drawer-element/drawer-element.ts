import {ChangeDetectionStrategy, Component, input, model, ViewEncapsulation} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslocoPipe} from "@ngneat/transloco";
import {NgClass} from "@angular/common";

@Component({
	selector: "app-drawer-element",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		TranslocoPipe,
		NgClass
	],
	templateUrl: "./drawer-element.html",
	styleUrl: "./drawer-element.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerElement {
	//region Members
	public buttonAlign = input<"start" | "end">("end");
	public maxHeight = input<string>("none");
	public maxWidth = input<string>("none");
	public isOpen = model<boolean>(false);
	public overflowY = input<"auto" | "hidden" | "scroll" | "visible">("auto");
	public title = input<string>("");
	public paddingContainer = input<string>("1rem 1rem 1rem 1rem ");
	public paddingHeader = input<string>("0 0 0 0");
	//endregion
}