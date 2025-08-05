import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {InputElement} from "@elements/input-element/input-element";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";
import {AuthentificationService} from "@services/authentification.service";
import {ValidatorHandlerService} from "@services/validator-handler.service";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {ModalHandlerService} from "@services/modal-handler.service";
import {LoaderComponent} from "@components/loader-component/loader-component";

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
	protected readonly buildIconSvgPath = buildIconSvgPath;
	protected readonly validatorHandlerService = inject(ValidatorHandlerService);
	protected readonly authentificationService = inject(AuthentificationService);
	private readonly modalHandlerService = inject(ModalHandlerService);
	private readonly router = inject(Router);
	//endregion
	//region Methods
	protected async submitAuthForm(): Promise<void> {
		if(!this.authentificationService.isAuthFormValid()) return
		const dialogRef = this.modalHandlerService.showModal(LoaderComponent);
		await this.authentificationService.onAuth();
		await this.router.navigate(["/main"]);
		await new Promise(resolve => setTimeout(resolve, 59900));
		this.modalHandlerService.closeModal(dialogRef);
		this.authentificationService.handlerAfterSuccessAuth();
	}
	//endregion

}
