import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {InputElement} from "@elements/input-element/input-element";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {AuthentificationService} from "@services/authentification.service";
import {ValidatorHandlerService} from "@services/validator-handler.service";
import {buildIconSvgPath} from "@utils/path-icon-helper";

@Component({
  selector: 'app-authentification-component',
	imports: [
		InputElement,
		ReactiveFormsModule,
		TranslatePipe,
		RouterLink
	],
  templateUrl: './authentification-component.html',
  styleUrl: './authentification-component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthentificationComponent {
	//region Members
	public readonly validatorHandlerService = inject(ValidatorHandlerService);
	public readonly authentificationService = inject(AuthentificationService);
	protected readonly buildIconSvgPath = buildIconSvgPath;
	//endregion

}
