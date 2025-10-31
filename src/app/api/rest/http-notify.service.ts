import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {UiFacadeService} from "@services/facade/ui-facade.service";
import {INotificationOptions} from "@interfaces/notification-options.interface";
import {NotyfNotification} from "notyf/notyf.models";
import {LangHelper} from "@utils/lang-helper";
import {notifyType} from "@constants/types";

@Injectable({
	providedIn: "root"
})
export class HttpNotify {
	//region Members
	private readonly http = inject(HttpClient);
	private readonly uiService = inject(UiFacadeService);
	private readonly langHelper = LangHelper;
	//endregion
	//region Methods
	private async executeWithNotification<T>(
		request: () => Promise<T>,
		notifyOptions?: INotificationOptions
	): Promise<T> {
		let notifyAnswer: NotyfNotification | null = null;
		const showFinalNotification = (type: notifyType) => {
			if (!notifyAnswer) return;
			this.uiService.notifyHandler.closeNotification(notifyAnswer);
			this.uiService.notifyHandler.showNotification({
				type,
				message: this.uiService.translateHandler.translate(
					this.langHelper.notification(type)
				)
			});
		};
		try {
			if (notifyOptions) {
				const translatedMessage = this.uiService.translateHandler.translate(notifyOptions.message);
				notifyAnswer = this.uiService.notifyHandler.showNotification({
					...notifyOptions,
					message: translatedMessage,
					timeout: 0,
					dismissible: false
				});
			}
			const result = await request();
			showFinalNotification("success");
			return result;
		}
		catch (e) {
			showFinalNotification("error");
			throw e;
		}
	}
	public async get<T>(
		url: string,
		options?: object,
		notifyOptions?: INotificationOptions
	): Promise<T> {
		return this.executeWithNotification(() => firstValueFrom(this.http.get<T>(url, options)),
			notifyOptions);
	}
	public async put<T>(
		url: string,
		body?: any,
		options?: object,
		notifyOptions?: INotificationOptions
	): Promise<T> {
		return this.executeWithNotification(
			() => firstValueFrom(this.http.put<T>(url, body, options)),
			notifyOptions
		);
	}
	public async delete<T>(
		url: string,
		options?: object,
		notifyOptions?: INotificationOptions
	): Promise<T> {
		return this.executeWithNotification(
			() => firstValueFrom(this.http.delete<T>(url, options)),
			notifyOptions
		);
	}
	public async post<T>(
		url: string,
		body?: any,
		options?: object,
		notifyOptions?: INotificationOptions
	): Promise<T> {
		return this.executeWithNotification(
			() => firstValueFrom(this.http.post<T>(url, body, options)),
			notifyOptions
		);
	}
	//endregion
}
