import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
	selector: "app-not-found-page",
	imports: [
		RouterLink,
		TranslatePipe
	],
	templateUrl: "./not-found-page.html",
	styleUrl: "./not-found-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPage {
}
