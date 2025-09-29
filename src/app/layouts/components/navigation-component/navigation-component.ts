import {ChangeDetectionStrategy, Component, inject, input, model, signal, ViewEncapsulation} from "@angular/core";
import {DrawerElement} from "@elements/drawer-element/drawer-element";
import {LangHelper} from "@utils/lang-helper";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {TranslocoPipe} from "@ngneat/transloco";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthentificationService} from "@services/authentification.service";
import {QuestionComponent} from "@components/question-component/question-component";
import {IQuestionModel} from "@interfaces/question-model.interface";
import {firstValueFrom, min} from "rxjs";
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
			iconPath: this.uiService.buildIconSvgPath("home-icon")
		}]);
	protected readonly otherBottomItems = signal<INavigationModel[]>([
		{
			link: "settings",
			text: this.langHelper.mainPageNavigation("HOME"),
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
		const awaitNotify = this.uiService.notifyHandler.showNotification(
			"info",
			this.uiService.translateHandler.translate(this.langHelper.notificationAccount("FORGOT", "START")),
			0,
			false);
		if (await this.authService.logout()) {
			this.uiService.notifyHandler.closeNotification(awaitNotify);
			this.authService.isRequestedLogout.set(true);
			await this.router.navigate(["/login"]);
			this.authService.isRequestedLogout.set(false);
			this.uiService.notifyHandler.showNotification(
				"success",
				this.uiService.translateHandler.translate(this.langHelper.notification("SUCCESS")));
			return;
		}
		this.uiService.notifyHandler.closeNotification(awaitNotify);
		this.uiService.notifyHandler.showNotification(
			"error",
			this.uiService.translateHandler.translate(this.langHelper.notification("FAILURE")));
	}
	//endregion
}
