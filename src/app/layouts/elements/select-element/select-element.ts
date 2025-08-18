import {
	ChangeDetectionStrategy,
	Component,
	computed,
	forwardRef,
	input,
	model,
	output,
	ViewEncapsulation
} from "@angular/core";
import {OverlayDropdownClickDirective} from "@directives/overlay-dropdown-click.directive";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {OverlayContainerService} from "@services/overlay-container.service";
import {AccessibilityDirective} from "@directives/accessibility.directive";
import {OverlayContainerElement} from "@elements/overlay-container-element/overlay-container-element";
import {IPlaceholderModel} from "@interfaces/placeholder-model.interface";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {TranslocoPipe} from "@ngneat/transloco";

@Component({
	selector: "app-select-element",
	standalone: true,
	imports: [
		OverlayDropdownClickDirective,
		AccessibilityDirective,
		OverlayContainerElement,
		TranslocoPipe
	],
	templateUrl: "./select-element.html",
	styleUrl: "./select-element.scss",
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectElement),
			multi: true
		}
	]
})
export class SelectElement implements ControlValueAccessor {
	//region Members
	protected readonly buildIconSvgPath = buildIconSvgPath;
	public placeholder = input<IPlaceholderModel | null>(null);
	public minWidth = input<string>("15rem");
	public maxWidth = input<string>("auto");
	public minHeight = input<string>("2.67rem");
	public maxHeight = input<string>("none");
	public width = input<string>("100%");
	public errorHint = input<string | null>(null);
	public height = input<string>("max-content");
	public clearIconIsVisible = input<boolean>(false);
	public selectedValue = model<ISelectItemModel | null>(null);
	public selectedValueChange = output<ISelectItemModel | null>();
	public empty = computed(() => this.selectedValue() === null);
	public showFloatedPlaceholder = input<boolean>(true);
	public itemSource = input<ISelectItemModel[] | null>(null);
	public disabled = model<boolean>(false);
	//endregion
	//region Methods
	protected onClearClick(event: Event): void {
		event.stopPropagation();
		this.selectedValue.set(null);
	}
	protected onSelectItem(item: ISelectItemModel, service: OverlayContainerService): void {
		if (item.value === this.selectedValue()?.value) {
			return;
		}
		this.selectedValue.set(item);
		this.selectedValueChange.emit(item);
		this.onChange(item);
		service.hide();
	}
	protected onTouched: () => void = () => {
	};
	private onChange: (value: ISelectItemModel | null) => void = () => {
	};
	//endregion
	//region Overrides
	public writeValue(value: ISelectItemModel): void {
		this.selectedValue.set(value);
	}
	public registerOnChange(fn: (value: ISelectItemModel | null) => void): void {
		this.onChange = fn;
	}
	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}
	public setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
	//endregion
}
