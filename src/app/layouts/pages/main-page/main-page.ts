import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";
import {NotifyHandlerService} from "@services/notify-handler.service";

@Component({
	selector: "app-main-page",
	standalone: true,
	imports: [TemplateComponent],
	templateUrl: "./main-page.html",
	styleUrl: "./main-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage {
	private readonly notifyService = inject(NotifyHandlerService);
	public onClick() {
		const gg = this.notifyService.showNotification("info", "Успешное уведомление 1!", {
			timeout: 5000
		});
	}
}