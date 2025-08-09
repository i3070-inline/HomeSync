import {IForgotPasswordInterface} from "@interfaces/forgot-password.interface";

export interface ILoginModel extends IForgotPasswordInterface {
	password: string | null;
}