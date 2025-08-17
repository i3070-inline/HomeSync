import {
	AngularNodeAppEngine,
	createNodeRequestHandler,
	isMainModule,
	writeResponseToNodeResponse
} from "@angular/ssr/node";
import express from "express";
import {join} from "node:path";
import cookieParser from "cookie-parser";

const browserDistFolder = join(import.meta.dirname, "../browser");
const app = express();
const angularApp = new AngularNodeAppEngine();
app.use(cookieParser());
app.use(
	express.static(browserDistFolder, {
		maxAge: "1y",
		index: false,
		redirect: false
	})
);
/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
	angularApp
		.handle(req, {
			providers: [
				{provide: "REQUEST", useValue: req},
				{provide: "RESPONSE", useValue: res}
			]
		})
		.then(async (response) => {
			if (response) {
				const theme = req.cookies["theme"] || "system";
				const html = await response.text();
				const modifiedHtml = html
					.replace(/<html([^>]*)>/i, `<html$1 theme="${theme}">`);
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
