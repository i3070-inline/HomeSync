import {ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";
import {TranslocoDirective} from "@ngneat/transloco";
import {ActivatedRoute, Router} from "@angular/router";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {RestBaseService} from "@rest/rest-base.service";
import {firstValueFrom, timer} from "rxjs";
import {restEndpoints} from "@rest/rest-endpoints";
import {LoadPlaceholderComponent} from "@components/load-placeholder-component/load-placeholder.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
	selector: "app-email-confirmation-page",
	standalone: true,
	imports: [
		TemplateComponent,
		LoadPlaceholderComponent,
		TranslocoDirective
	],
	templateUrl: "./email-confirmation-page.html",
	styleUrl: "./email-confirmation-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmationPage implements OnInit {
	//region Members
	private readonly http = inject(RestBaseService);
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	protected readonly uiService = inject(UiFacadeService);
	protected isEmailConfirmed = signal<boolean>(false);
	protected seconds = signal<number | null>(0);
	protected isRequesting = signal<boolean>(false);
	//endregion
	//region Methods
	protected async onReloadPage(): Promise<void> {
		await this.onConfirmEmail();
	}
	protected async onLoginPage(): Promise<void> {
		await this.router.navigate(["/login"]);
	}
	private async onConfirmEmail(): Promise<void> {
		try {
			const token = this.route.snapshot.queryParamMap.get("token");
			this.isRequesting.set(true);
			await firstValueFrom(timer(0, 1000));
			await firstValueFrom(this.http.post<string>(`${restEndpoints.user.emailConfirmation}${token}`));
			this.isEmailConfirmed.set(true);
			this.isRequesting.set(false);
			for (let i = 5; i > 0; i--) {
				this.seconds.set(i);
				await firstValueFrom(timer(1000));
			}
			this.seconds.set(null);
			await this.onLoginPage();
		}
		catch (e) {
			if (e instanceof HttpErrorResponse && e.status === 401) {
				await this.router.navigate(["/error"]);
				return;
			}
			console.error(e);
			this.isEmailConfirmed.set(false);
		}
		finally {
			this.isRequesting.set(false);
		}
	}
	//endregion
	//region Overrides
	async ngOnInit(): Promise<void> {
		await this.onConfirmEmail();
	}
	//endregion
}
