import {ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";
import {TranslocoDirective} from "@ngneat/transloco";
import {ActivatedRoute, Router} from "@angular/router";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {JwtService} from "@services/jwt.service";
import {RestBaseService} from "@rest/rest-base.service";
import {firstValueFrom, timer} from "rxjs";
import {restEndpoints} from "@rest/rest-endpoints";
import {LoadPlaceholderComponent} from "@components/load-placeholder-component/load-placeholder.component";

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
	private readonly jwt = inject(JwtService);
	private readonly http = inject(RestBaseService);
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	protected readonly uiService = inject(UiFacadeService);
	protected isEmailConfirmed = signal<boolean>(false);
	protected emailConfirmed = signal<string>("");
	protected seconds = signal<number | null>(1);
	protected isRequesting = signal<boolean>(false);
	//endregion
	//region Methods
	private isValidEmailConfirmationToken(token: string | null): boolean {
		return token !== null && !this.jwt.isTokenExpired(token) && !this.jwt.getEmail(token) !== null;
	}
	protected async onReloadPage(): Promise<void> {
		await this.router.navigate([this.router.url]);
	}
	protected async onLoginPage(): Promise<void> {
		await this.router.navigate(["/login"]);
	}
	//endregion
	//region Overrides
	async ngOnInit(): Promise<void> {
		const token = this.route.snapshot.queryParamMap.get("token");
		console.log(token);
		if (!this.isValidEmailConfirmationToken(token)) {
			await this.router.navigate(["not-found"]);
			return;
		}
		try {
			this.isRequesting.set(true);
			this.emailConfirmed.set(this.jwt.getEmail(token)!);
			await firstValueFrom(this.http.get<string>(`${restEndpoints.user.emailConfirmation}${token}`));
			this.isEmailConfirmed.set(true);
			this.isRequesting.set(false);
			for (let i = 10; i > 0; i--) {
				this.seconds.set(i);
				await firstValueFrom(timer(1000));
			}
			this.seconds.set(null);
			await this.onLoginPage();
		}
		catch (e) {
			console.error(e);
			this.isEmailConfirmed.set(false);
		}
		finally {
			this.isRequesting.set(false);
		}
	}
	//endregion
}
