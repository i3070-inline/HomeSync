import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {CookiesSettingsService} from "@services/cookies-settings.service";
import {SettingsFacadeService} from "@services/facade/settings-facade.service";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: "./app.html",
	styleUrl: "./app.scss"
})
export class App {
	constructor(
		public settings: CookiesSettingsService,
		public facade: SettingsFacadeService) {
	}
}
