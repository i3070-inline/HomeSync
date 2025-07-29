import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {ValidatorHandlerService} from "@services/validator-handler.service";
import {RegisterService} from "@services/register.service";
import {InputElement} from "@elements/input-element/input-element";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {buildIconSvgPath} from "@utils/path-icon-helper";

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
	protected readonly registerService = inject(RegisterService);

	//endregion
}
