import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";
import {RouterOutlet} from "@angular/router";
import {AuthentificationService} from "@services/authentification.service";
import {OverlayContainerElement} from "@elements/overlay-container-element/overlay-container-element";
import {OverlayDropdownClickDirective} from "@directives/overlay-dropdown-click.directive";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {NgOptimizedImage} from "@angular/common";
import {TranslocoPipe} from "@ngneat/transloco";
import {FormsModule} from "@angular/forms";
import {NavigationComponent} from "@components/navigation-component/navigation-component";
import {LangHelper} from "@utils/lang-helper";

@Component({
	selector: "app-main-page",
	standalone: true,
	imports: [TemplateComponent,
		OverlayContainerElement, OverlayDropdownClickDirective, NgOptimizedImage, TranslocoPipe, FormsModule, NavigationComponent, RouterOutlet],
	templateUrl: "./main-page.html",
	styleUrl: "./main-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage {
	//region Members
	protected readonly langHelper = LangHelper;
	protected readonly uiService = inject(UiFacadeService);
	protected readonly authService = inject(AuthentificationService);
	//endregion
}