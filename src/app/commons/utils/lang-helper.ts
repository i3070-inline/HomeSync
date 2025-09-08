export class LangHelper {
	//region SETTINGS
	static settings(
		section: "THEME" | "LANGUAGE" | "ANIMATION",
		part: "DESCRIPTION" | "ACTION"
	): string {
		return `SETTINGS.${section}.${part}`;
	}
	static settingsOption(
		section: "THEME" | "LANGUAGE" | "ANIMATION",
		option: "LIGHT" | "DARK" | "SYSTEM" | "ENGLISH" | "ROMANIAN" | "RUSSIAN" | "ACTIVE" | "REDUCE"
	): string {
		return `SETTINGS.${section}.OPTIONS.${option}`;
	}
	static settingsCopyright(): string {
		return "SETTINGS.COPYRIGHT";
	}
	//endregion
	//region USER_INFO
	static userInfo(field: "ID" | "USERNAME" | "ROLE"): string {
		return `USER_INFO.${field}`;
	}
	//endregion
	//region LOGIN_PAGE
	static loginInfo(): string {
		return "LOGIN_PAGE.SIGN_INFO";
	}
	static loginForm(
		form: "SIGN_UP" | "SIGN_IN" | "FORGOT",
		part: "TITLE" | "ACTION"
	): string {
		return `LOGIN_PAGE.${form}_FORM.${part}`;
	}
	static loginCover(
		type: "SIGN_IN" | "SIGN_UP",
		part: "TITLE" | "DESCRIPTION" | "ACTION"
	): string {
		return `LOGIN_PAGE.${type}_COVER.${part}`;
	}
	static forgotPassword(): string {
		return "LOGIN_PAGE.FORGOT_PASSWORD";
	}
	static emailField(part: "DESCRIPTION" | "ACTION"): string {
		return `LOGIN_PAGE.EMAIL.${part}`;
	}
	static passwordField(part: "DESCRIPTION" | "ACTION"): string {
		return `LOGIN_PAGE.PASSWORD.${part}`;
	}
	static confirmPasswordField(part: "DESCRIPTION" | "ACTION"): string {
		return `LOGIN_PAGE.CONFIRM_PASSWORD.${part}`;
	}
	//endregion
	//region MAIN_PAGE
	static mainPageNavigation(part: "TITLE" | "HOME" | "LOGOUT"): string {
		return `MAIN_PAGE.NAVIGATION.${part}`;
	}
	//endregion
	//region ERROR_PAGE
	static errorCode(
		code: number,
		part: "TITLE" | "DESCRIPTION"
	): string {
		return `ERROR_PAGE.CODES.${code}.${part}`;
	}
	static errorAction(): string {
		return "ERROR_PAGE.ACTION";
	}
	//endregion
	//region EMAIL_CONFIRMATION_PAGE
	static emailConfirmationPage(part: "TITLE" | "TIMER"): string {
		return `EMAIL_CONFIRMATION_PAGE.${part}`;
	}
	static emailConfirmationDescription(result: "SUCCESS" | "FAILURE"): string {
		return `EMAIL_CONFIRMATION_PAGE.DESCRIPTION.${result}`;
	}
	static emailConfirmationAction(result: "SUCCESS" | "FAILURE"): string {
		return `EMAIL_CONFIRMATION_PAGE.ACTION.${result}`;
	}
	//endregion
	//region VALIDATORS
	static validator(field: "REQUIRED" | "MIN_LENGTH" | "PASSWORD_MISMATCH" | "INVALID_EMAIL"): string {
		return `VALIDATORS.${field}`;
	}
	//endregion
	//region NOTIFICATIONS
	static notification(type: "SUCCESS" | "FAILURE"): string {
		return `NOTIFICATIONS.${type}`;
	}
	static notificationAccount(
		section: "SIGN_IN" | "SIGN_UP" | "FORGOT",
		field: "START" | "EMAIL_VERIFICATION"
	): string {
		return `NOTIFICATIONS.${section}.${field}`;
	}
	//endregion
}