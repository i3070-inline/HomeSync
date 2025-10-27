//region Types
type SettingsSection = "THEME" | "LANGUAGE" | "ANIMATION";
type SettingsPart = "DESCRIPTION" | "ACTION";
type SettingsOption =
	| "LIGHT"
	| "DARK"
	| "SYSTEM"
	| "ENGLISH"
	| "ROMANIAN"
	| "RUSSIAN"
	| "ACTIVE"
	| "REDUCE";
type UserInfoField = "ID" | "USERNAME" | "ROLE";
type LoginForm = "SIGN_UP" | "SIGN_IN" | "FORGOT";
type LoginFormPart = "TITLE" | "ACTION";
type LoginCoverType = "SIGN_IN" | "SIGN_UP";
type LoginCoverPart = "TITLE" | "DESCRIPTION" | "ACTION";
type MainNavPart = "TITLE" | "HOME" | "SETTINGS" | "LOGOUT";
type MainUtilPart = "TITLE" | "NOTIFICATIONS";
type ErrorPart = "TITLE" | "DESCRIPTION";
type QuestionType = "LOGOUT";
type QuestionPart = "TITLE" | "QUESTION";
type QuestionActionPart = "ACTION_YES" | "ACTION_NO";
type EmailResult = "SUCCESS" | "FAILURE";
type ValidatorField = "REQUIRED" | "MIN_LENGTH" | "PASSWORD_MISMATCH" | "INVALID_EMAIL";
type NotificationType = "SUCCESS" | "FAILURE";
type NotificationAccountSection = "SIGN_IN" | "SIGN_UP" | "FORGOT" | "LOGOUT";
type NotificationAccountField = "START" | "EMAIL_VERIFICATION";

//endregion
export class LangHelper {
	//region General Methods
	private static key(...parts: Array<string | number>): string {
		return parts.join(".");
	}
	//endregion
	//region SETTINGS
	public static settings(section: SettingsSection, part: SettingsPart): string {
		return this.key("SETTINGS", section, part);
	}
	public static settingsOption(section: SettingsSection, option: SettingsOption): string {
		return this.key("SETTINGS", section, "OPTIONS", option);
	}
	public static settingsCopyright(): string {
		return this.key("SETTINGS", "COPYRIGHT");
	}
	//endregion
	//region USER_INFO
	public static userInfo(field: UserInfoField): string {
		return this.key("USER_INFO", field);
	}
	//endregion
	//region LOGIN_PAGE
	public static loginInfo(): string {
		return this.key("LOGIN_PAGE", "SIGN_INFO");
	}
	public static loginForm(form: LoginForm, part: LoginFormPart): string {
		return this.key("LOGIN_PAGE", `${form}_FORM`, part);
	}
	public static loginCover(type: LoginCoverType, part: LoginCoverPart): string {
		return this.key("LOGIN_PAGE", `${type}_COVER`, part);
	}
	public static forgotPassword(): string {
		return this.key("LOGIN_PAGE", "FORGOT_PASSWORD");
	}
	public static emailField(part: LoginCoverPart | "ACTION" | "DESCRIPTION"): string {
		return this.key("LOGIN_PAGE", "EMAIL", part);
	}
	public static passwordField(part: LoginCoverPart | "ACTION" | "DESCRIPTION"): string {
		return this.key("LOGIN_PAGE", "PASSWORD", part);
	}
	public static confirmPasswordField(part: LoginCoverPart | "ACTION" | "DESCRIPTION"): string {
		return this.key("LOGIN_PAGE", "CONFIRM_PASSWORD", part);
	}
	//endregion
	//region MAIN_PAGE
	public static mainPageNavigation(part: MainNavPart): string {
		return this.key("MAIN_PAGE", "NAVIGATION", part);
	}
	public static mainPageUtilities(part: MainUtilPart): string {
		return this.key("MAIN_PAGE", "UTILITIES", part);
	}
	//endregion
	//region ERROR_PAGE
	public static errorCode(code: number, part: ErrorPart): string {
		return this.key("ERROR_PAGE", "CODES", code, part);
	}
	public static errorAction(): string {
		return this.key("ERROR_PAGE", "ACTION");
	}
	//endregion
	//region QUESTION_COMPONENT
	public static questionComponent(type: QuestionType, part: QuestionPart): string {
		return this.key("QUESTION_COMPONENT", type, part);
	}
	public static questionAction(part: QuestionActionPart): string {
		return this.key("QUESTION_COMPONENT", part);
	}
	//endregion
	//region EMAIL_CONFIRMATION_PAGE
	public static emailConfirmationPage(part: "TITLE" | "TIMER"): string {
		return this.key("EMAIL_CONFIRMATION_PAGE", part);
	}
	public static emailConfirmationDescription(result: EmailResult): string {
		return this.key("EMAIL_CONFIRMATION_PAGE", "DESCRIPTION", result);
	}
	public static emailConfirmationAction(result: EmailResult): string {
		return this.key("EMAIL_CONFIRMATION_PAGE", "ACTION", result);
	}
	//endregion
	//region VALIDATORS
	public static validator(field: ValidatorField): string {
		return this.key("VALIDATORS", field);
	}
	//endregion
	//region NOTIFICATIONS
	public static notification(type: NotificationType): string {
		return this.key("NOTIFICATIONS", type);
	}
	public static notificationAccount(section: NotificationAccountSection, field: NotificationAccountField): string {
		return this.key("NOTIFICATIONS", section, field);
	}
	//endregion
}
