import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {InputElement} from "@elements/input-element/input-element";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {RegistrationService} from "@services/registration.service";

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
	protected readonly uiService = inject(UiFacadeService);
	protected readonly registerService = inject(RegistrationService);
	//endregion
	//region Methods
	protected async onSubmitRegisterForm(): Promise<void> {
		if (!this.registerService.isFormValid()) return;
		const awaitNotify = this.uiService.notifyHandler.showNotification("info",
			this.uiService.translateHandler.instant("NOTIFICATIONS.SIGN_UP.START"), 0, false);
		const result = await this.registerService.onGenericExecution();
		if (result.successful) {
			this.uiService.notifyHandler.closeNotification(awaitNotify);
			this.registerService.resetAccountForm();
			this.uiService.notifyHandler.showNotification("success",
				this.uiService.translateHandler.instant("NOTIFICATIONS.SUCCESS"));
			this.uiService.notifyHandler.showNotification("info",
				this.uiService.translateHandler.instant("NOTIFICATIONS.SIGN_UP.EMAIL_VERIFICATION"),
				10000);
			return;
		}
		this.uiService.notifyHandler.closeNotification(awaitNotify);
		this.uiService.notifyHandler.showNotification("error",
			this.uiService.translateHandler.instant("NOTIFICATIONS.FAILURE"));
	}
	//endregion
}
