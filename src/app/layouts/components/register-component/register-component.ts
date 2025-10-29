import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {InputElement} from "@elements/input-element/input-element";
import {ReactiveFormsModule} from "@angular/forms";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {RegistrationService} from "@services/registration.service";
import {TranslocoPipe} from "@ngneat/transloco";
import {LangHelper} from "@utils/lang-helper";

@Component({
	selector: "app-register-component",
	standalone: true,
	imports: [
		InputElement,
		ReactiveFormsModule,
		TranslocoPipe
	],
	templateUrl: "./register-component.html",
	styleUrl: "./register-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
	//region Members
	protected readonly langHelper = LangHelper;
	protected readonly uiService = inject(UiFacadeService);
	protected readonly registerService = inject(RegistrationService);
	//endregion
	//region Methods
	protected async onSubmitRegisterForm(): Promise<void> {
		if (!this.registerService.isFormValid()) return;
		if (!await this.registerService.onGenericExecution()) return
		this.registerService.resetAccountForm();
	}
	//endregion
}
