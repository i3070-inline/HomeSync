export function buildIconSvgPath(iconName: string, id: string = ""): string {
	return `assets/icons/${iconName}.svg#${id ?? iconName}`;
}