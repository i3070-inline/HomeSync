import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";
import {RouterLink} from "@angular/router";
import {UpperCasePipe} from "@angular/common";
import {TranslocoPipe} from "@ngneat/transloco";
import {TemplateComponent} from "@components/template-component/template-component";

@Component({
	selector: "app-not-found-page",
	imports: [
		RouterLink,
		UpperCasePipe,
		TranslocoPipe,
		TemplateComponent
	],
	templateUrl: "./not-found-page.html",
	styleUrl: "./not-found-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPage {
}
