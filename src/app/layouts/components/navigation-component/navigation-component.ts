import {ChangeDetectionStrategy, Component, inject, input, model, signal, ViewEncapsulation} from "@angular/core";
import {DrawerElement} from "@elements/drawer-element/drawer-element";
import {LangHelper} from "@utils/lang-helper";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {TranslocoPipe} from "@ngneat/transloco";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthentificationService} from "@services/authentification.service";
import {QuestionComponent} from "@components/question-component/question-component";
import {IQuestionModel} from "@interfaces/question-model.interface";
import {firstValueFrom} from "rxjs";
import {INavigationModel} from "@interfaces/navigation-model.interface";

@Component({
	selector: "app-navigation-component",
	standalone: true,
	imports: [
		DrawerElement,
		TranslocoPipe,
		RouterLink,
		RouterLinkActive
	],
	templateUrl: "./navigation-component.html",
	styleUrl: "./navigation-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
	//region Members
	protected readonly langHelper = LangHelper;
	protected readonly router = inject(Router);
	protected readonly authService = inject(AuthentificationService);
	protected readonly uiService = inject(UiFacadeService);
	public minWidthOpenMenu = input<string>("7rem");
	public maxWidthOpenMenu = input<string>("max-content");
	protected readonly navigationTopItems = signal<INavigationModel[]>([
		{
			link: "/main/me",
			text: this.langHelper.mainPageNavigation("HOME"),
			iconPath: this.uiService.buildIconSvgPath("home-icon"),
		}]);
	protected readonly otherBottomItems = signal<INavigationModel[]>([
		{
			link: "settings",
			text: this.langHelper.mainPageNavigation("SETTINGS"),
			iconPath: this.uiService.buildIconSvgPath("user-settings-icon")
		}]);
	public isOpen = model<boolean>(false);
	//endregion
	//region Methods
	public async onLogout() {
		if (!await firstValueFrom(this.uiService.modalHandler.showModal<IQuestionModel, boolean>(QuestionComponent,
			{
				title: this.langHelper.questionComponent("LOGOUT", "TITLE"),
				question: this.langHelper.questionComponent("LOGOUT", "QUESTION")
			}).closed)) return;
		if (!await this.authService.logout()) return
			this.authService.isRequestedLogout.set(true);
			await this.router.navigate(["/login"]);
			this.authService.isRequestedLogout.set(false);
	}
	//endregion
}
