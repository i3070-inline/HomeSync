import {inject, signal, Signal} from "@angular/core";
import {PlatformService} from "@services/platform.service";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {StorageFacadeService} from "@services/facade/storage-facade.service";
import {TranslocoService} from "@ngneat/transloco";
import {LangHelper} from "@utils/lang-helper";

export abstract class SettingsHandlerBase<T> {
	//region Members
	protected readonly platformService = inject(PlatformService);
	protected readonly langHelper = LangHelper;
	protected readonly translateService = inject(TranslocoService);
	private readonly storageFacade = inject(StorageFacadeService);
	protected abstract get cookiesKey(): string;
	protected abstract get defaultValue(): T;
	public abstract get options(): Signal<ISelectItemModel<T>[]>;
	public selectedOption = signal<ISelectItemModel<T> | null>(null);
	//endregion
	//region Methods
	public async init(): Promise<void> {
		const value = this.storageFacade.cookiesStorage.getItem<T>(this.cookiesKey) || this.defaultValue;
		this.selectedOption.set(this.options().find(option => option.value === value) || null);
	}
	private setStorageValue(value: T): void {
		this.storageFacade.cookiesStorage.setItem<T>(this.cookiesKey, value);
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
