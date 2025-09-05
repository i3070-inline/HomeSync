import {inject, Injectable, TemplateRef} from "@angular/core";
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import {ComponentType} from "@angular/cdk/portal";
import {getCssVariablesValue} from "@utils/dom-helper";
import {PlatformService} from "@services/platform.service";

@Injectable({
	providedIn: "root"
})
export class ModalHandlerService {
	//region Members
	private readonly dialog = inject(Dialog);
	private readonly platformService = inject(PlatformService);
	//endregion
	//region Methods
	public showModal<TData, TResult = unknown>(
		component: ComponentType<unknown> | TemplateRef<unknown>,
		data?: TData,
		isUsingHandlerClose: boolean = false
	): DialogRef<TResult> {
		const ref = this.dialog.open<TResult>(component, {
			panelClass: "modal-animate-in",
			disableClose: true,
			hasBackdrop: true,
			backdropClass: "overlay-backdrop",
			disableAnimations: true,
			data: data
		});
		isUsingHandlerClose && this.attachCloseListeners(ref);
		return ref;
	}
	public closeModal<TResult = unknown>(ref: DialogRef<TResult>): void {
		const value = getCssVariablesValue(this.platformService, "transition-duration");
		const duration = value ? parseFloat(value) * 1000 : 0;
		ref.addPanelClass("modal-animate-out");
		setTimeout(() => {
			ref.close();
		}, duration);
	}
	private attachCloseListeners<TResult = unknown>(ref: DialogRef<TResult>): void {
		ref.backdropClick.subscribe(() => {
			this.closeModal(ref);
		});
		ref.keydownEvents.subscribe((event: KeyboardEvent) => {
			if (event.key === "Escape") {
				this.closeModal(ref);
			}
		});
	}
	//endregion
}
