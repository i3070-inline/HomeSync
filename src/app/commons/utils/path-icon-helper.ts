export function buildIconSvgPath(iconName: string, id: string = ""): string {
	return `assets/icons/${iconName}.svg#${id || iconName}`;
}
export function buildImagePath(iconName: string, extesion : string = "png"): string {
	return `assets/icons/${iconName}.${extesion}`;
}