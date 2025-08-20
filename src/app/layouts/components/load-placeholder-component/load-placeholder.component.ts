import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {TitleCasePipe} from "@angular/common";
import {SettingsFacadeService} from "@services/facade/settings-facade.service";
import {UiFacadeService} from "@services/facade/ui-facade.service";

@Component({
	selector: "app-load-placeholder-component",
	standalone: true,
	imports: [
		TitleCasePipe
	],
	templateUrl: "./load-placeholder.component.html",
	styleUrl: "./load-placeholder.component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadPlaceholderComponent {
	//region Members
	protected readonly settingsService = inject(SettingsFacadeService);
	protected readonly uiService = inject(UiFacadeService);
	//endregion
}
