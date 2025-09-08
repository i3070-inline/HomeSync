import {IForgotPasswordModel} from "@interfaces/forgot-password-model.interface";

export interface ILoginModel extends IForgotPasswordModel {
	password: string | null;
}