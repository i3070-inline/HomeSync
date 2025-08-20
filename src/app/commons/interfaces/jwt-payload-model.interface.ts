export interface IJwtPayloadModel {
	roles?: string[];
	email?: string;
	[key: string]: unknown;
}