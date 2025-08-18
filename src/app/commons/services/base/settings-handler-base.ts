import {inject, makeStateKey, REQUEST, signal, Signal, TransferState} from "@angular/core";
import {PlatformService} from "@services/platform.service";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {TranslateService} from "@ngx-translate/core";
import {StorageFacadeService} from "@services/facade/storage-facade.service";

export abstract class SettingsHandlerBase<T> {
	//region Members
	// protected readonly req = inject(REQUEST);
	protected readonly transferState = inject(TransferState);
	protected readonly platformService = inject(PlatformService);
	protected readonly translateService = inject(TranslateService);
	private readonly storageFacade = inject(StorageFacadeService);
	protected abstract get cookiesKey(): string;
	protected abstract get defaultValue(): T;
	private get valueState() {
		return makeStateKey<T>(`settings-handler-${this.cookiesKey}`);
	}
	public abstract get options(): Signal<ISelectItemModel<T>[]>;
	public selectedOption = signal<ISelectItemModel<T> | null>(null);
	//endregion
	//region Constructor
	//region Methods
	public async init(): Promise<void> {
		// if (this.platformService.isServer()) {
		// 	const cookieValue = this.getCookieValue(this.cookiesKey);
		// 	value = (cookieValue as T) || this.defaultValue;
		// 	this.transferState.set(this.valueState, value);
		// }
		// else {
		// 	value = this.transferState.get(this.valueState, this.defaultValue);
		// 	if(value === this.defaultValue) {
		// 		value = this.storageFacade.cookiesStorage.getItem<T>(this.cookiesKey) || this.defaultValue;
		// 	}
		// }
		const value = this.storageFacade.cookiesStorage.getItem<T>(this.cookiesKey) || this.defaultValue
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
	// private getCookieValue(key: string): string | null {
	// 	const cookieHeader = this.req?.headers.get("cookie");
	// 	if (!cookieHeader || !key) return null;
	// 	const cookies = cookieHeader
	// 		.split(";")
	// 		.map(cookie => cookie.trim().split("="))
	// 		.reduce((acc, [cookieKey, cookieValue]) => {
	// 			acc[cookieKey] = cookieValue;
	// 			return acc;
	// 		}, {} as Record<string, string>);
	// 	return cookies[key] || null;
	// }
	protected abstract handlingChanges(value: T): void;
	//endregion
}
