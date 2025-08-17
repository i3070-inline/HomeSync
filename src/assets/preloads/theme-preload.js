// (function () {
// 	const key = "theme";
// 	const theme = JSON.parse(localStorage.getItem(key))
// 	if (!theme) {
// 		const defaultTheme = "system";
// 		localStorage.setItem(key, JSON.stringify(defaultTheme))
// 		document.documentElement.setAttribute(key, defaultTheme);
// 		return;
// 	}
// 	document.documentElement.setAttribute(key, theme);
// })()
(function () {
	const key = "theme";
	const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
	const theme = match ? decodeURIComponent(match[2]) : "system";
	document.documentElement.setAttribute(key, theme);
})();