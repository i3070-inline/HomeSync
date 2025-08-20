import {IForgotPassword} from "@interfaces/forgot-password.interface";

export interface ILoginModel extends IForgotPassword {
	password: string | null;
}