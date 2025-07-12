import pkg from "@beforeApp/package.json";

export const applicationDetails = {
	name: pkg.displayName,
	version: pkg.version,
	currentYear: new Date().getFullYear()
};
