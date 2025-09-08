import {ChangeDetectionStrategy, Component, inject, model, ViewEncapsulation} from "@angular/core";
import {DrawerElement} from "@elements/drawer-element/drawer-element";
import {LangHelper} from "@utils/lang-helper";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {TranslocoPipe} from "@ngneat/transloco";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navigation-component',
	standalone: true,
	imports: [
		DrawerElement,
		TranslocoPipe,
		RouterLink,
		RouterLinkActive
	],
  templateUrl: './navigation-component.html',
  styleUrl: './navigation-component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
	//region Members
	protected readonly langHelper = LangHelper;
	protected readonly uiService = inject(UiFacadeService);
	public isOpen = model<boolean>(false);
	//endregion
}
