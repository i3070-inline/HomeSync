export interface ISelectItemModel<T = string> {
	iconPath?: string;
	iconColor?: string;
	name: string;
	value: T;
}