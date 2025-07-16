import {inject, Injectable, signal} from "@angular/core";
import {LocalStorageService} from "@services/local-storage.service";
import {PlatformService} from "@services/platform.service";
import {ISelectItemModel} from "@interfaces/select-item-model.interface";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {system} from "@constants/types";
import {Observable, Subject} from "rxjs";

type animationType = "active" | "reduce" | system;

@Injectable({
	providedIn: "root"
})
export class AnimationHandlerService {
	//region Members
	private readonly localStorageService = inject(LocalStorageService);
	private readonly platformService = inject(PlatformService);
	private readonly localStorageKey = "animation";
	private readonly animationChangedSubject = new Subject<animationType>();
	public animationChanged$: Observable<animationType> = this.animationChangedSubject.asObservable();
	public animations = signal<ISelectItemModel<animationType>[]>(
		[
			{
				value: "active",
				name: "SETTINGS.ANIMATION.OPTIONS.ACTIVE",
				iconPath: buildIconSvgPath("animation-active-icon"),
				iconColor: "var(--success-color)"
			},
			{
				value: "reduce",
				name: "SETTINGS.ANIMATION.OPTIONS.REDUCE",
				iconPath: buildIconSvgPath("animation-reduce-icon"),
				iconColor: "var(--error-color)"
			},
			{
				value: "system",
				name: "SETTINGS.ANIMATION.OPTIONS.SYSTEM",
				iconPath: buildIconSvgPath("default-icon")
			}]);
	public selectedAnimation = signal<ISelectItemModel<animationType> | null>(null);
	//endregion
	//region Constructor
	constructor() {
		const storageAnimation = this.getStorageTheme();
		this.setAnimation(storageAnimation);
		this.setStorageAnimation(storageAnimation);
		this.selectedAnimation.set(this.animations().find(theme => theme.value === storageAnimation) || null);
	}
	//endregion
	//region Methods
	public onSelectedAnimationChange(value: ISelectItemModel | null): void {
		const animation = value as ISelectItemModel<animationType>;
		if (!animation) return;
		this.selectedAnimation.set(animation);
		this.setAnimation(animation.value);
		this.setStorageAnimation(animation.value);
		this.animationChangedSubject.next(animation.value);
	}
	public getStorageTheme(): animationType {
		return this.localStorageService.getItem<animationType>(this.localStorageKey) || "system";
	}
	private setAnimation(theme: animationType): void {
		this.platformService.runOnBrowserPlatform(() => {
			document.documentElement.setAttribute(this.localStorageKey, theme);
		});
	}
	private setStorageAnimation(animation: animationType): void {
		this.localStorageService.setItem<animationType>(this.localStorageKey, animation);
	}
	//endregion
}
