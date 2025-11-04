import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	model,
	OnInit,
	signal,
	ViewEncapsulation
} from "@angular/core";
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
import {CookiesStorageService} from "@services/cookies-storage.service";

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
export class NavigationComponent implements OnInit {
	//region Members
	private readonly _cookiesKeyIsOpen = "navigation-is-open";
	protected readonly langHelper = LangHelper;
	protected readonly router = inject(Router);
	protected readonly authService = inject(AuthentificationService);
	protected readonly uiService = inject(UiFacadeService);
	private readonly cookiesService = inject(CookiesStorageService);
	public minWidthOpenMenu = input<string>("7rem");
	public maxWidthOpenMenu = input<string>("max-content");
	public isOpen = model<boolean>(false);
	protected readonly navigationTopItems = signal<INavigationModel[]>([
		{
			link: "home",
			text: this.langHelper.mainPageNavigation("HOME"),
			iconPath: this.uiService.buildIconSvgPath("home-icon")
		}]);
	protected readonly otherBottomItems = signal<INavigationModel[]>([
		{
			link: "settings",
			text: this.langHelper.mainPageNavigation("SETTINGS"),
			iconPath: this.uiService.buildIconSvgPath("user-settings-icon")
		}]);
	//endregion
	//region Methods
	public async onLogout() {
		if (!await firstValueFrom(this.uiService.modalHandler.showModal<IQuestionModel, boolean>(QuestionComponent,
			{
				title: this.langHelper.questionComponent("LOGOUT", "TITLE"),
				question: this.langHelper.questionComponent("LOGOUT", "QUESTION")
			}).closed)) return;
		if (!await this.authService.logout()) return;
		this.authService.isRequestedLogout.set(true);
		await this.router.navigate(["/login"]);
		this.authService.isRequestedLogout.set(false);
	}
	public isOpenChange($event: boolean) {
		this.isOpen.set($event);
		this.cookiesService.setItem<boolean>(this._cookiesKeyIsOpen, $event);
	}
	//endregion
	//region Overrides
	ngOnInit(): void {
		const isOpenCookie = this.cookiesService.getItem<boolean>(this._cookiesKeyIsOpen);
		this.isOpenChange(isOpenCookie ?? false);
	}
	//endregion
}
