import {Injectable, signal} from '@angular/core';

@Injectable()
export class OverlayContainerService {
  //region Members
  public isOpened = signal<boolean>(false);
  public isClosing = signal<boolean>(true);
  public animationState = signal<'open' | 'close'>('close');
  //endregion
  //region Methods
  public show = (): void => {
    this.isClosing.set(false);
    this.isOpened.set(true);
    this.animationState.set('open');
  };
  public hide = (): void => {
    this.isClosing.set(true);
    this.animationState.set('close');
  };
  //endregion
}