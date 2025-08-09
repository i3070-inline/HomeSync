import {ILoginModel} from "@interfaces/login-model.interface";

export interface IRegisterModel extends ILoginModel {
	confirmPassword: string | null;
}