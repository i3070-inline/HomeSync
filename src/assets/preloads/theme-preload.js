(function () {
	const key = "theme";
	document.documentElement.setAttribute("animation","reduce");
	const theme = JSON.parse(localStorage.getItem(key))
	if (!theme) {
		const defaultTheme = "system";
		localStorage.setItem(key, JSON.stringify(defaultTheme))
		document.documentElement.setAttribute(key, defaultTheme);
		return;
	}
	document.documentElement.setAttribute(key, theme);
})()