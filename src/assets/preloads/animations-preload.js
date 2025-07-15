(function () {
	const key = "animation";
	const animation = JSON.parse(localStorage.getItem(key))
	if (!animation) {
		const defaultAnimation = "system";
		localStorage.setItem(key, JSON.stringify(defaultAnimation))
		document.documentElement.setAttribute(key, defaultAnimation);
		return;
	}
	document.documentElement.setAttribute(key, animation);
})()