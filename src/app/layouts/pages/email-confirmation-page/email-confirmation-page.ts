import {ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";
import {TranslocoDirective, TranslocoPipe} from "@ngneat/transloco";
import {ActivatedRoute, Router} from "@angular/router";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {LangHelper} from "@utils/lang-helper";
import {PlatformService} from "@services/platform.service";
import {sleep} from "@utils/sleep-helper";

@Component({
	selector: "app-email-confirmation-page",
	standalone: true,
	imports: [
		TemplateComponent,
		TranslocoDirective,
		TranslocoPipe
	],
	templateUrl: "./email-confirmation-page.html",
	styleUrl: "./email-confirmation-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmationPage implements OnInit {
	//region Members;
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly platform = inject(PlatformService);
	protected readonly langHelper = LangHelper;
	protected readonly uiService = inject(UiFacadeService);
	protected isEmailConfirmed = signal<boolean>(false);
	protected seconds = signal<number | null>(0);
	//endregion
	//region Methods
	protected async onReloadPage(): Promise<void> {
		this.platform.runOnBrowserPlatform(() => {
			window.location.reload();
		});
	}
	protected async onLoginPage(): Promise<void> {
		await this.router.navigate(["/login"]);
	}
	private async onConfirmEmail(): Promise<void> {
		const resultData = this.route.snapshot.data["confirmed"] as { confirmed: boolean };
		if (!resultData?.confirmed) {
			this.isEmailConfirmed.set(false);
			return;
		}
		this.isEmailConfirmed.set(true);
		for (let i = 5; i > 0; i--) {
			this.seconds.set(i);
			await sleep(1000);
		}
		await this.onLoginPage();
	}
	//endregion;
	//region Overrides
	async ngOnInit(): Promise<void> {
		await this.onConfirmEmail();
	}
	//endregion
}
