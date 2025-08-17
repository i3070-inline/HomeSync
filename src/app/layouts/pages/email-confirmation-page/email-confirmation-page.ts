import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
	selector: "app-email-confirmation-page",
	imports: [],
	templateUrl: "./email-confirmation-page.html",
	styleUrl: "./email-confirmation-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmationPage {
}
