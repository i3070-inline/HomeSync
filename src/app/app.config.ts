import {
	ApplicationConfig,
	inject,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection
} from "@angular/core";
import {PreloadAllModules, provideRouter, withPreloading, withViewTransitions} from "@angular/router";
import {routes} from "./app.routes";
import {provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import SwiperCore, {EffectCards} from "@swiper-base";
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {requestLoggingInterceptor} from "@interceptors/request-logging.interceptor";
import {responseLoggingInterceptor} from "@interceptors/response-logging.intercepter";
import {tokenHeaderInterceptor} from "@interceptors/token-header.interceptor";
import {retryInterceptor} from "@interceptors/retry-request.interceptor";

SwiperCore.use([EffectCards]);
export const appConfig: ApplicationConfig = {
	providers: [
		provideTranslateService({
			loader: {
				provide: TranslateLoader,
				useFactory: () => new TranslateHttpLoader(inject(HttpClient), "assets/languages/", ".json"),
				deps: [HttpClient]
			}
		}),
		provideHttpClient(withInterceptors([
			retryInterceptor,
			requestLoggingInterceptor,
			responseLoggingInterceptor,
			tokenHeaderInterceptor
		])),
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes,
			withPreloading(PreloadAllModules),
			withViewTransitions()),
		provideClientHydration(withEventReplay()),
		provideAnimations()
	]
};
