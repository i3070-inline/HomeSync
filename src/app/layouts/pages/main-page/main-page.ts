import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";
import {RouterLink} from "@angular/router";

import {AuthentificationService} from "@services/authentification.service";

@Component({
	selector: "app-main-page",
	standalone: true,
	imports: [TemplateComponent, RouterLink],
	templateUrl: "./main-page.html",
	styleUrl: "./main-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage {

	private ayth = inject(AuthentificationService);
	public async deleteToken() {
		await this.ayth.logout()
	}
	public async getdata() {
		await this.ayth.loadCurrentUser()
	}
}