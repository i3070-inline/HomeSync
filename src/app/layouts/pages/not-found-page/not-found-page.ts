import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";
import {RouterLink} from "@angular/router";
import {UpperCasePipe} from "@angular/common";
import {TranslocoPipe} from "@ngneat/transloco";

@Component({
	selector: "app-not-found-page",
	imports: [
		RouterLink,
		UpperCasePipe,
		TranslocoPipe
	],
	templateUrl: "./not-found-page.html",
	styleUrl: "./not-found-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPage {
}
