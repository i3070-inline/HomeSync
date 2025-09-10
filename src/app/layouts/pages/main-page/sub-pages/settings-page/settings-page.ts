import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
	selector: "app-settings-page",
	imports: [],
	templateUrl: "./settings-page.html",
	styleUrl: "./settings-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {
}
