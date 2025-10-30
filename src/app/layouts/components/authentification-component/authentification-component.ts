import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {InputElement} from "@elements/input-element/input-element";
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthentificationService} from "@services/authentification.service";
import {ForgotComponent} from "@components/forgot-component/forgot-component";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {TranslocoPipe} from "@ngneat/transloco";
import {LangHelper} from "@utils/lang-helper";
import {HttpNotify} from "@rest/http-notify.service";

@Component({
	selector: "app-authentification-component",
	imports: [
		InputElement,
		ReactiveFormsModule,
		TranslocoPipe
	],
	templateUrl: "./authentification-component.html",
	styleUrl: "./authentification-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthentificationComponent {
	//region Members
	protected http = inject(HttpNotify);
	protected readonly langHelper = LangHelper;
	protected readonly uiService = inject(UiFacadeService);
	protected readonly authentificationService = inject(AuthentificationService);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	//endregion
	//region Methods
	protected async onSubmitAuthForm(): Promise<void> {
		if (!this.authentificationService.isFormValid()) return;
		if (!await this.authentificationService.onGenericExecution()) return;
		await this.router.navigate([this.route.snapshot.queryParams["returnUrl"] || "/main"]);
		this.authentificationService.resetAccountForm();
	}
	public onShowForgotForm() {
		this.uiService.modalHandler.showModal(ForgotComponent);
	}
	//endregion
}
