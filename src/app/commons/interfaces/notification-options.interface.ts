import {notifyType} from "@constants/types";
import {DeepPartial, INotyfPosition} from "notyf";

export interface INotificationOptions {
	type?: notifyType,
	message: string,
	timeout?: number,
	dismissible?: boolean,
	opts?: Partial<{
		position: DeepPartial<INotyfPosition>,
		dismissible: boolean
	}>
}