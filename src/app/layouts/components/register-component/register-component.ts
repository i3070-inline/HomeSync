import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {ValidatorHandlerService} from "@services/validator-handler.service";
import {RegistrationService} from "@services/registration.service";
import {InputElement} from "@elements/input-element/input-element";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {NotifyHandlerService} from "@services/notify-handler.service";

@Component({
	selector: "app-register-component",
	standalone: true,
	imports: [
		InputElement,
		ReactiveFormsModule,
		TranslatePipe
	],
	templateUrl: "./register-component.html",
	styleUrl: "./register-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
	//region Members
	protected readonly buildIconSvgPath = buildIconSvgPath;
	protected readonly validatorHandlerService = inject(ValidatorHandlerService);
	protected readonly translateService = inject(TranslateService);
	protected readonly registerService = inject(RegistrationService);
	private readonly notifyHandlerService = inject(NotifyHandlerService);
	//endregion
	//region Methods
	protected async onSubmitRegisterForm(): Promise<void> {
		if (!this.registerService.isFormValid()) return;
		const awaitNotify = this.notifyHandlerService.showNotification("info", this.translateService.instant("NOTIFICATIONS.SIGN_UP.START"), 0, false);
		if (await this.registerService.onGenericExecution()) {
			this.notifyHandlerService.closeNotification(awaitNotify);
			this.registerService.resetAccountForm();
			this.notifyHandlerService.showNotification("success", this.translateService.instant("NOTIFICATIONS.SUCCESS"));
			this.notifyHandlerService.showNotification("info", this.translateService.instant("NOTIFICATIONS.SIGN_UP.EMAIL_VERIFICATION"), 10000);
			return;
		}
		this.notifyHandlerService.showNotification("error", this.translateService.instant("NOTIFICATIONS.ERROR"));
	}
	//endregion
}
