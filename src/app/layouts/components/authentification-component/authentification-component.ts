import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {InputElement} from "@elements/input-element/input-element";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {AuthentificationService} from "@services/authentification.service";
import {ValidatorHandlerService} from "@services/validator-handler.service";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {NotifyHandlerService} from "@services/notify-handler.service";
import {ModalHandlerService} from "@services/modal-handler.service";
import {ForgotComponent} from "@components/forgot-component/forgot-component";

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
	private readonly router = inject(Router);
	private readonly notifyHandlerService = inject(NotifyHandlerService);
	private readonly modalService = inject(ModalHandlerService);
	protected readonly buildIconSvgPath = buildIconSvgPath;
	protected readonly validatorHandlerService = inject(ValidatorHandlerService);
	protected readonly authentificationService = inject(AuthentificationService);
	protected readonly translateService = inject(TranslateService);
	//endregion
	//region Methods
	protected async onSubmitAuthForm(): Promise<void> {
		if (!this.authentificationService.isFormValid()) return;
		const awaitNotify = this.notifyHandlerService.showNotification("info", this.translateService.instant("NOTIFICATIONS.SIGN_IN.START"), 0, false);
		if (await this.authentificationService.onGenericExecution()) {
			this.notifyHandlerService.closeNotification(awaitNotify);
			await this.router.navigate(["/main"]);
			this.authentificationService.resetAccountForm();
			this.notifyHandlerService.showNotification("success", this.translateService.instant("NOTIFICATIONS.SUCCESS"));
			return;
		}
		this.notifyHandlerService.showNotification("error", this.translateService.instant("NOTIFICATIONS.ERROR"));
	}
	public onShowForgotForm() {
		this.modalService.showModal(ForgotComponent);
	}
	//endregion
}
