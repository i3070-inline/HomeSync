import {
	ChangeDetectionStrategy,
	Component,
	computed,
	forwardRef,
	input,
	model,
	OnInit,
	output,
	signal,
	ViewEncapsulation
} from "@angular/core";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IPlaceholderModel} from "@interfaces/placeholder-model.interface";
import {buildIconSvgPath} from "@utils/path-icon-helper";


type typeInput = "text" | "password" | "email" | "search" | "tel" | "url"

@Component({
	selector: "app-input-element",
	standalone: true,
	imports: [
		FormsModule
	],
	templateUrl: "./input-element.html",
	styleUrl: "./input-element.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputElement),
			multi: true
		}
	]
})
export class InputElement implements ControlValueAccessor, OnInit {
	//region Members
	protected readonly buildIconSvgPath = buildIconSvgPath;
	public placeholder = input<IPlaceholderModel | null>(null);
	public inputType = input.required<typeInput>();
	public eyeIconIsVisible = input<boolean>(false);
	public clearIconIsVisible = input<boolean>(false);
	public showFloatedPlaceholder = input<boolean>(true);
	public autocomplete = input<"on" | "off">("off");
	public inputErrorHint = input<string | null>(null);
	public focused = signal<boolean>(false);
	public value = signal<string | null>(null);
	public valueChange = output<string | null>();
	public empty = computed(() => this.value() === "" || this.value() === null);
	public inputTypeSignal = signal<typeInput>("text");
	public disabled = model<boolean>(false);
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
