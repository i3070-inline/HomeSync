import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	inject,
	input,
	model,
	OnInit,
	output,
	signal,
	ViewEncapsulation
} from "@angular/core";
import {ControlValueAccessor, FormsModule, NgControl} from "@angular/forms";
import {IPlaceholderModel} from "@interfaces/placeholder-model.interface";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {TranslocoPipe} from "@ngneat/transloco";
import {ValidatorHandlerService} from "@services/validator-handler.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

type typeInput = "text" | "password" | "email" | "search" | "tel" | "url"

@Component({
	selector: "app-input-element",
	standalone: true,
	imports: [
		FormsModule,
		TranslocoPipe
	],
	templateUrl: "./input-element.html",
	styleUrl: "./input-element.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputElement implements ControlValueAccessor, OnInit {
	//region Members
	protected readonly buildIconSvgPath = buildIconSvgPath;
	private readonly validationHelper = inject(ValidatorHandlerService);
	private readonly ngControl = inject(NgControl, {optional: true, self: true});
	private readonly destroyRef = inject(DestroyRef);
	public placeholder = input<IPlaceholderModel | null>(null);
	public inputType = input.required<typeInput>();
	public eyeIconIsVisible = input<boolean>(false);
	public clearIconIsVisible = input<boolean>(false);
	public showFloatedPlaceholder = input<boolean>(true);
	public isReadOnly = input<boolean>(false);
	public autocomplete = input<"on" | "off">("off");
	public errorHint = signal<{ key: string; params?: Record<string, unknown> } | null>(null);
	public focused = signal<boolean>(false);
	public value = signal<string | null>(null);
	public valueChange = output<string | null>();
	public empty = computed(() => this.value() === "" || this.value() === null);
	public inputTypeSignal = signal<typeInput>("text");
	public disabled = model<boolean>(false);
	//endregion
	//region Constructor
	public constructor() {
		if (!this.ngControl) return;
		this.ngControl.valueAccessor = this;
	}
	//endregion
	//region Methods
	protected onBlur = (): void => {
		this.onTouched();
		this.focused.set(false);
	};
	protected onFocus = (): void => {
		this.focused.set(true);
	};
	protected onPasswordVisibility(): void {
		if (this.inputTypeSignal() === "password") {
			this.inputTypeSignal.set("text");
			return;
		}
		this.inputTypeSignal.set(this.inputType());
	}
	protected onValueChange(value: string | null): void {
		this.value.set(value);
		this.valueChange.emit(value);
		this.onChange(value);
	}
	public onClearValue() {
		this.value.set(null);
		this.valueChange.emit(null);
		this.onChange(null);
	}
	private onTouched: () => void = () => {
	};
	private onChange: (value: string | null) => void = () => {
	};
	//endregion
	//region Overrides
	public ngOnInit(): void {
		this.inputTypeSignal.set(this.inputType());
		const control = this.ngControl?.control;
		if (!control) return;
		control.events.pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(value => {
			const errors = value.source.errors;
			if (!errors || !value.source.dirty) return;
			this.errorHint.set(this.validationHelper.getErrorMessage(errors));
		});
	}
	public writeValue(value: string | null): void {
		this.value.set(value);
	}
	public registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}
	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}
	public setDisabledState(isDisabled: boolean) {
		this.disabled.set(isDisabled);
	}
	//endregion
}
