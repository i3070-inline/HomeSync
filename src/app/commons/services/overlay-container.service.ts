import {Injectable, signal} from "@angular/core";

@Injectable()
export class OverlayContainerService {
	//region Members
	public isOpened = signal<boolean>(false);
	public isClosing = signal<boolean>(true);
	//endregion
	//region Methods
	public show = (): void => {
		this.isClosing.set(false);
		this.isOpened.set(true);
	};
	public hide = (): void => {
		this.isClosing.set(true);
		this.isOpened.set(false);
	};
	//endregion
}