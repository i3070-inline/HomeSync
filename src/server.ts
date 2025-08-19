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
import compression from "compression";
//region Constants
const browserDistFolder = join(import.meta.dirname, "../browser");
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
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
//endregion
//region Express App Configuration
const app = express();
const angularApp = new AngularNodeAppEngine();
//region Middleware setup
app.use(compression());
app.use(cookieParser());
app.use(
	express.static(browserDistFolder, {
		maxAge: "1y",
		index: false,
		redirect: false
	})
);
//endregion
//region SEO Routes
app.get("/robots.txt", (req, res) => {
	res.type("text/plain");
	res.send(`User-agent: *
Allow: /

Sitemap: ${req.protocol}://${req.get("host")}/sitemap.xml`);
});
app.get("/sitemap.xml", (req, res) => {
	res.type("application/xml");
	res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${req.protocol}://${req.get("host")}/</loc>
		<changefreq>weekly</changefreq>
		<priority>1.0</priority>
	</url>
</urlset>`);
});
//endregion
//region Cookie Management
function getConfigFromCookies(req: express.Request, res: express.Response): {
	language: string;
	theme: string;
	animation: string;
} {
	let language = req.cookies[COOKIE_KEYS.LANGUAGE];
	if (!language) {
		language = DEFAULT_VALUES.LANGUAGE;
		res.cookie(COOKIE_KEYS.LANGUAGE, language, {maxAge: COOKIE_MAX_AGE});
	}
	let theme = req.cookies[COOKIE_KEYS.THEME];
	if (!theme) {
		theme = DEFAULT_VALUES.THEME;
		res.cookie(COOKIE_KEYS.THEME, theme, {maxAge: COOKIE_MAX_AGE});
	}
	let animation = req.cookies[COOKIE_KEYS.ANIMATION];
	if (!animation) {
		animation = DEFAULT_VALUES.ANIMATION;
		res.cookie(COOKIE_KEYS.ANIMATION, animation, {maxAge: COOKIE_MAX_AGE});
	}
	console.log("Cookies:", req.cookies);
	return {language, theme, animation};
}
//endregion
//region Angular SSR Handler
app.use((req, res, next) => {
	// Skip for static files and API routes
	if (req.path.includes(".") || req.path.startsWith("/api/")) {
		return next();
	}
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
					.replace(
						/<html([^>]*)>/i,
						`<html$1 theme="${theme}" anim="${animation}" lang="${language}" translate="no">`
					)
					.replace(
						/<head>/i,
						"<head>\n<meta name=\"google\" content=\"notranslate\">"
					);
				const modifiedResponse = new Response(modifiedHtml, {
					status: response.status,
					statusText: response.statusText,
					headers: response.headers
				});
				await writeResponseToNodeResponse(modifiedResponse, res);
			}
			else {
				next();
			}
		})
		.catch(next);
});
//endregion
//region Server Startup
// if (isMainModule(import.meta.url)) {
// 	const port = process.env["PORT"] || 4000;
// 	app.listen(port, (error?: Error) => {
// 		if (error) {
// 			throw error;
// 		}
// 		console.log(`Node Express server listening on http://localhost:${port}`);
// 	});
// }
//endregion
//region Export
/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
//endregion