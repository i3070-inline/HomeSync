import {ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewEncapsulation} from "@angular/core";
import {TemplateComponent} from "@components/template-component/template-component";
import {TranslocoPipe} from "@ngneat/transloco";
import {UpperCasePipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
	selector: "app-errors-page",
	standalone: true,
	imports: [
		TemplateComponent,
		TranslocoPipe,
		UpperCasePipe,
		RouterLink
	],
	templateUrl: "./errors-page.html",
	styleUrl: "./errors-page.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorsPage implements OnInit {
	//region Members
	protected errorCode = signal<number>(404);
	protected errorCodes = signal<number[]>([400, 403, 404, 405, 406, 422, 500, 502, 503, 504]);
	protected route = inject(ActivatedRoute);
	//endregion
	//region Overrides
	public ngOnInit(): void {
		const parsedParam = parseFloat(this.route.snapshot.paramMap.get("code") || "NaN");
		if (this.errorCodes().includes(parsedParam))
			this.errorCode.set(parsedParam);
	}
	//endregion
}
