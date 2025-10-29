import {inject, Injectable} from "@angular/core";
import {Notyf} from "notyf";
import {NotyfNotification} from "notyf/notyf.models";
import {PlatformService} from "@services/platform.service";
import {INotificationOptions} from "@interfaces/notification-options.interface";

@Injectable({
	providedIn: "root"
})
export class NotifyHandlerService {
	//region Members
	private notifications: NotyfNotification[] = [];
	private notify!: Notyf;
	private platform = inject(PlatformService);
	//endregion
	//region Constructor
	constructor() {
		this.platform.runOnBrowserPlatform(() => {
			this.notify = new Notyf({
				types: [
					{
						type: "success",
						icon: {
							className: "notyf__icon--success",
							tagName: "span"
						}
					},
					{
						type: "error",
						icon: {
							className: "notyf__icon--error",
							tagName: "span"
						}
					},
					{
						type: "info",
						icon: {
							className: "notyf__icon--info",
							tagName: "span"
						}
					},
					{
						type: "warning",
						icon: {
							className: "notyf__icon--warning",
							tagName: "span"
						}
					}
				]
			});
		});
	}
	//endregion
	//region Overrides
	//region Methods
	public showNotification(notifyOptions: INotificationOptions): NotyfNotification {
		this.checkLimitNotifications();
		const result = this.notify.open({
			type: notifyOptions.type ?? "info",
			message: notifyOptions.message,
			duration: notifyOptions.timeout ?? 3000,
			position: notifyOptions.opts?.position ?? {
				x: "right",
				y: "bottom"
			},
			dismissible: notifyOptions.dismissible ?? true
		});
		this.notifications.push(result);
		return result;
	}
	public closeNotification(notification: NotyfNotification): void {
		this.notify.dismiss(notification);
		this.notifications = this.notifications.filter(n => n !== notification);
	}
	public closeAllNotifications(): void {
		this.notify.dismissAll();
		this.notifications = [];
	}
	private checkLimitNotifications(): void {
		if (this.notifications.length <= 3) return;
		this.closeNotification(this.notifications[0]);
	}
	//endregion
}
