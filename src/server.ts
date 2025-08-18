import {
	AngularNodeAppEngine,
	createNodeRequestHandler,
	isMainModule,
	writeResponseToNodeResponse
} from "@angular/ssr/node";
import express from "express";
import {join} from "node:path";
import cookieParser from "cookie-parser";
import {REQUEST, RESPONSE_INIT} from "@angular/core";

const browserDistFolder = join(import.meta.dirname, "../browser");
const app = express();
const angularApp = new AngularNodeAppEngine();
const COOKIE_KEYS = {
	LANGUAGE: "lang",
	THEME: "theme",
	ANIMATION: "anim"
} as const;
const DEFAULT_VALUES = {
	LANGUAGE: "en",
	THEME: "system",
	ANIMATION: "system"
} as const;
app.use(cookieParser());
app.use(
	express.static(browserDistFolder, {
		maxAge: "1y",
		index: false,
		redirect: false
	})
);
function getConfigFromCookies(req: any, res: any): {
	language: string,
	theme: string,
	animation: string
} {
	const maxAge = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
	let language = req.cookies[COOKIE_KEYS.LANGUAGE];
	if (!language) {
		language = DEFAULT_VALUES.LANGUAGE;
		res.cookie(COOKIE_KEYS.LANGUAGE, language, {maxAge});
	}
	let theme = req.cookies[COOKIE_KEYS.THEME];
	if (!theme) {
		theme = DEFAULT_VALUES.THEME;
		res.cookie(COOKIE_KEYS.THEME, theme, {maxAge});
	}
	let animation = req.cookies[COOKIE_KEYS.ANIMATION];
	if (!animation) {
		animation = DEFAULT_VALUES.ANIMATION;
		res.cookie(COOKIE_KEYS.ANIMATION, animation, {maxAge});
	}
	console.log("Cookies :", req.cookies);
	return {language, theme, animation};
}
app.use((req, res, next) => {
	const {language, theme, animation} = getConfigFromCookies(req, res);
	angularApp
		.handle(req, {
			providers: [
				{provide: REQUEST, useValue: req},
				{provide: RESPONSE_INIT, useValue: res}
			]
		})
		.then(async (response) => {
			if (response) {
				const html = await response.text();
				const modifiedHtml = html
					.replace(/<html([^>]*)>/i, `<html$1 theme="${theme}" anim="${animation}" lang="${language}" translate="no">`)
					.replace(/<head>/i, "<head>\n<meta name=\"google\" content=\"notranslate\">");
				const modifiedResponse = new Response(modifiedHtml, {
					status: response.status,
					statusText: response.statusText,
					headers: response.headers
				});
				await writeResponseToNodeResponse(modifiedResponse, res);
			}
		})
		.catch(next);
});
/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
	const port = process.env["PORT"] || 4000;
	app.listen(port, (error) => {
		if (error) {
			throw error;
		}
		console.log(`Node Express server listening on http://localhost:${port}`);
	});
}
/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
