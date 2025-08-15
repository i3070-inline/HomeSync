import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";

@Component({
	selector: "app-email-confirmation-page",
	imports: [
		TemplateComponent
	],
	templateUrl: "./email-confirmation-page.html",
	styleUrl: "./email-confirmation-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmationPage {
}
