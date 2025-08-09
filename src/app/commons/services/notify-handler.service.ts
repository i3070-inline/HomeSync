import {Injectable} from "@angular/core";
import {DeepPartial, INotyfPosition, Notyf} from "notyf";
import {NotyfNotification} from "notyf/notyf.models";

type notifyType = "success" | "error" | "info" | "warning";

@Injectable({
	providedIn: "root"
})
export class NotifyHandlerService {
	//region Members
	private notifications: NotyfNotification[] = [];
	private readonly notify = new Notyf({
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
	//endregion
	//region Methods
	public showNotification(type: notifyType, message: string, timeout? : number, dismissible?:boolean, opts?: Partial<{
		position: DeepPartial<INotyfPosition>,
		dismissible: boolean
	}>): NotyfNotification {
		this.checkLimitNotifications();
		const result = this.notify.open({
			type: type,
			message: message,
			duration: timeout ?? 3000,
			position: opts?.position ?? {
				x: "right",
				y: "bottom"
			},
			dismissible: dismissible ?? true
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
