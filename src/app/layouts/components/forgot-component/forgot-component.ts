import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {InputElement} from "@elements/input-element/input-element";
import {ForgotHandlerService} from "@services/forgot-handler.service";
import {DialogRef} from "@angular/cdk/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {TranslocoPipe} from "@ngneat/transloco";
import {LangHelper} from "@utils/lang-helper";

@Component({
	selector: "app-forgot-component",
	standalone: true,
	imports: [
		InputElement,
		ReactiveFormsModule,
		TranslocoPipe
	],
	templateUrl: "./forgot-component.html",
	styleUrl: "./forgot-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotComponent {
	//region Members
	protected readonly langHelper = LangHelper;
	protected readonly uiService = inject(UiFacadeService);
	protected readonly forgotService = inject(ForgotHandlerService);
	private readonly dialogRef = inject(DialogRef);
	//endregion
	//region Methods
	protected async onSubmitForgotForm(): Promise<void> {
		if (!this.forgotService.isFormValid()) return;
		const awaitNotify = this.uiService.notifyHandler.showNotification(
			"info",
			this.uiService.translateHandler.translate(this.langHelper.notificationAccount("FORGOT", "START")),
			0,
			false);
		if (await this.forgotService.onGenericExecution()) {
			this.uiService.notifyHandler.closeNotification(awaitNotify);
			this.forgotService.resetAccountForm();
			this.uiService.notifyHandler.showNotification(
				"success",
				this.uiService.translateHandler.translate(this.langHelper.notification("SUCCESS")));
			this.uiService.notifyHandler.showNotification(
				"info",
				this.uiService.translateHandler.translate(this.langHelper.notificationAccount("FORGOT", "EMAIL_VERIFICATION")),
				10000);
			return;
		}
		this.uiService.notifyHandler.closeNotification(awaitNotify);
		this.uiService.notifyHandler.showNotification(
			"error",
			this.uiService.translateHandler.translate(this.langHelper.notification("FAILURE")));
	}
	protected onClose(): void {
		this.forgotService.resetAccountForm();
		this.uiService.modalHandler.closeModal(this.dialogRef);
	}
	//endregion
}