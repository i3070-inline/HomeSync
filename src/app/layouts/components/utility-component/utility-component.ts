import {ChangeDetectionStrategy, Component, inject, model, ViewEncapsulation} from "@angular/core";
import {DrawerElement} from "@elements/drawer-element/drawer-element";
import {TranslocoPipe} from "@ngneat/transloco";
import {LangHelper} from "@utils/lang-helper";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {NotificationElement} from "@elements/notification-element/notification-element";

@Component({
	selector: "app-utility-component",
	imports: [
		DrawerElement,
		TranslocoPipe,
		NotificationElement
	],
	templateUrl: "./utility-component.html",
	styleUrl: "./utility-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilityComponent {
	//region Members
	protected readonly langHelper = LangHelper;
	protected readonly uiService = inject(UiFacadeService);
	public isOpen = model<boolean>(false);
	//endregion
}