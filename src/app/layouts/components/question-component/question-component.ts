import {ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation} from "@angular/core";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IQuestionModel} from "@interfaces/question-model.interface";
import {TranslocoPipe} from "@ngneat/transloco";
import {LangHelper} from "@utils/lang-helper";
import {UiFacadeService} from "@services/facade/ui-facade.service";

@Component({
	selector: "app-question-component",
	standalone: true,
	imports: [
		TranslocoPipe
	],
	templateUrl: "./question-component.html",
	styleUrl: "./question-component.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
	//region Members
	private readonly dialogRef = inject(DialogRef);
	protected readonly langHelper = LangHelper;
	protected readonly uiService = inject(UiFacadeService);
	protected data = signal<IQuestionModel | null>(inject(DIALOG_DATA, {optional: true}));
	//endregion
	//region Methods
	protected onClose(result: boolean = false): void {
		this.dialogRef.close(result);
	}
	//endregion
}