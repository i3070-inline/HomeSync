import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {InputElement} from "@elements/input-element/input-element";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {ForgotHandlerService} from "@services/forgot-handler.service";
import {ModalHandlerService} from "@services/modal-handler.service";
import {DialogRef} from "@angular/cdk/dialog";
import {NotifyHandlerService} from "@services/notify-handler.service";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {ValidatorHandlerService} from "@services/validator-handler.service";

@Component({
	selector: "app-forgot-component",
	standalone: true,
	imports: [
		InputElement,
		ReactiveFormsModule,
		TranslatePipe
	],
	templateUrl: "./forgot-component.html",
	styleUrl: "./forgot-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotComponent {
	//region Members
	protected readonly buildIconSvgPath = buildIconSvgPath;
	protected readonly forgotService = inject(ForgotHandlerService);
	protected readonly validatorService = inject(ValidatorHandlerService);
	private readonly modalService = inject(ModalHandlerService);
	private readonly dialogRef = inject(DialogRef);
	private readonly notifyHandlerService = inject(NotifyHandlerService);
	//endregion
	//region Methods
	protected async onSubmitForgotForm(): Promise<void> {
		if (!this.forgotService.isFormValid()) return;
		const awaitNotify = this.notifyHandlerService.showNotification("info", "NOTIFICATIONS.FORGOT.START", 0, false);
		if (await this.forgotService.onGenericExecution()) {
			this.notifyHandlerService.closeNotification(awaitNotify);
			this.notifyHandlerService.showNotification("success", "NOTIFICATIONS.SUCCESS");
			this.onClose();
			return;
		}
		this.notifyHandlerService.showNotification("error", "NOTIFICATIONS.ERROR");
	}
	protected onClose(): void {
		this.forgotService.resetAccountForm();
		this.modalService.closeModal(this.dialogRef);
	}
	//endregion
}