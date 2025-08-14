import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {InputElement} from "@elements/input-element/input-element";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthentificationService} from "@services/authentification.service";
import {ForgotComponent} from "@components/forgot-component/forgot-component";
import {UiFacadeService} from "@services/facade/ui-facade.service";

@Component({
	selector: "app-authentification-component",
	imports: [
		InputElement,
		ReactiveFormsModule,
		TranslatePipe
	],
	templateUrl: "./authentification-component.html",
	styleUrl: "./authentification-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthentificationComponent {
	//region Members
	protected readonly uiService = inject(UiFacadeService);
	protected readonly authentificationService = inject(AuthentificationService);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	//endregion
	//region Methods
	protected async onSubmitAuthForm(): Promise<void> {
		if (!this.authentificationService.isFormValid()) return;
		const awaitNotify = this.uiService.notifyHandler.showNotification("info",
			this.uiService.translateHandler.instant("NOTIFICATIONS.SIGN_IN.START"), 0, false);
		const result = await this.authentificationService.onGenericExecution();
		if (result.successful) {
			this.uiService.notifyHandler.closeNotification(awaitNotify);
			await this.router.navigateByUrl(this.route.snapshot.queryParams["returnUrl"] || `/main/${result.data}`);
			this.authentificationService.resetAccountForm();
			this.uiService.notifyHandler.showNotification("success",
				this.uiService.translateHandler.instant("NOTIFICATIONS.SUCCESS"));
			return;
		}
		this.uiService.notifyHandler.closeNotification(awaitNotify);
		this.uiService.notifyHandler.showNotification("error",
			this.uiService.translateHandler.instant("NOTIFICATIONS.FAILURE"));
	}
	public onShowForgotForm() {
		this.uiService.modalHandler.showModal(ForgotComponent);
	}
	//endregion
}
