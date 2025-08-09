import {inject, signal, Signal} from "@angular/core";
import {LocalStorageService} from "@services/local-storage.service";
import {PlatformService} from "@services/platform.service";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {TranslateService} from "@ngx-translate/core";

export abstract class SettingsHandlerBase<T> {
	//region Members
	protected readonly localStorageService = inject(LocalStorageService);
	protected readonly platformService = inject(PlatformService);
	protected readonly translateService = inject(TranslateService);
	protected abstract get localStorageKey(): string;
	protected abstract get defaultValue(): T;
	public abstract get options(): Signal<ISelectItemModel<T>[]>;
	public selectedOption = signal<ISelectItemModel<T> | null>(null);
	//endregion
	//region Constructor
	protected constructor() {
		this.init();
	}
	//endregion
	//region Methods
	private init(): void {
		const storageValue = this.getStorageValue();
		this.setStorageValue(storageValue);
		this.selectedOption.set(this.options().find(option => option.value === storageValue) || null);
		this.handlingChanges(storageValue);
	}
	private getStorageValue(): T {
		return this.localStorageService.getItem<T>(this.localStorageKey) || this.defaultValue;
	}
	private setStorageValue(value: T): void {
		this.localStorageService.setItem<T>(this.localStorageKey, value);
	}
	public onSelectedOptionChange(value: ISelectItemModel | null): void {
		const option = value as ISelectItemModel<T>;
		if (!option) return;
		this.setStorageValue(option.value);
		this.selectedOption.set(option);
		this.handlingChanges(option.value);
	}
	protected abstract handlingChanges(value: T): void;
	//endregion
}
