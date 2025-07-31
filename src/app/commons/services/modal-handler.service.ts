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
	public showModal(component: ComponentType<unknown> | TemplateRef<unknown>, isUsingHandlerClose: boolean = false): DialogRef {
		const ref = this.dialog.open(component, {
			panelClass: "modal-animate-in",
			disableClose: true,
			hasBackdrop: true,
			backdropClass: "overlay-backdrop",
			disableAnimations: true
		});
		isUsingHandlerClose && this.attachCloseListeners(ref);
		return ref;
	}
	public closeModal(ref: DialogRef): void {
		const value = getCssVariablesValue(this.platformService, "transition-duration");
		const duration = value ? parseFloat(value) * 1000 : 0;
		ref.addPanelClass("modal-animate-out");
		setTimeout(() => {
			ref.close();
		}, duration);
	}
	private attachCloseListeners(ref: DialogRef): void {
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
