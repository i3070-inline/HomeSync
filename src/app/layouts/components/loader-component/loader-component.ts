import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";
import {CdkTrapFocus} from "@angular/cdk/a11y";

@Component({
	selector: "app-loader-component",
	imports: [
		CdkTrapFocus
	],
	templateUrl: "./loader-component.html",
	styleUrl: "./loader-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
}