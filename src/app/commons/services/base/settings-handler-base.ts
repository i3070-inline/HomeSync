import {inject, signal, Signal} from "@angular/core";
import {LocalStorageService} from "@services/local-storage.service";
import {PlatformService} from "@services/platform.service";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {TranslateService} from "@ngx-translate/core";
import {CookiesSettingsService} from "@services/cookies-settings.service";
import {StorageFacadeService} from "@services/facade/storage-facade.service";

export abstract class SettingsHandlerBase<T> {
	//region Members
	protected readonly cookiesSettings = inject(CookiesSettingsService);
	protected readonly platformService = inject(PlatformService);
	protected readonly translateService = inject(TranslateService);
	private readonly storageFacade = inject(StorageFacadeService);
	protected abstract get cookiesKey(): string;
	protected abstract get cookiesValue(): T;
	public abstract get options(): Signal<ISelectItemModel<T>[]>;
	public selectedOption = signal<ISelectItemModel<T> | null>(null);
	//endregion
	//region Constructor
	public constructor() {
		this.init();
	}
	//endregion
	//region Methods
	private init(): void {
		this.setStorageValue(this.cookiesValue);
		this.selectedOption.set(this.options().find(option => option.value === this.cookiesValue) || null);
		this.handlingChanges(this.cookiesValue);
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
