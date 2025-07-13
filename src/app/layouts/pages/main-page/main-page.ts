import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";

@Component({
	selector: "app-main-page",
	standalone: true,
	imports: [
		TemplateComponent
	],
	templateUrl: "./main-page.html",
	styleUrl: "./main-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage {
}
