import {
	ApplicationConfig,
	inject,
	isDevMode,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection
} from "@angular/core";
import {provideRouter, withRouterConfig, withViewTransitions} from "@angular/router";
import {routes} from "./app.routes";
import {provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import SwiperCore, {EffectCards} from "@swiper-base";
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {requestLoggingInterceptor} from "@interceptors/request-logging.interceptor";
import {responseLoggingInterceptor} from "@interceptors/response-logging.intercepter";
import {retryInterceptor} from "@interceptors/retry-request.interceptor";
import {ThemeHandlerService} from "@services/theme-handler.service";
import {AnimationHandlerService} from "@services/animation-handler.service";
import {provideTransloco} from "@ngneat/transloco";
import {TranslocoHttpLoader} from "@services/transloco-loader.service";
import {LanguageHandlerService} from "@services/language-handler.service";
import {timeoutInterceptor} from "@interceptors/timeout.interceptor";
import {authRefreshInterceptor} from "@interceptors/auth-refresh.interceptor";
import {authorizationInterceptor} from "@interceptors/authorization.interceptor";
import {AuthentificationService} from "@services/authentification.service";

SwiperCore.use([EffectCards]);
export const appConfig: ApplicationConfig = {
	providers: [
		provideAppInitializer(async () => {
			await inject(AuthentificationService).loadCurrentUser();
		}),
		provideAppInitializer(() => inject(ThemeHandlerService).init()),
		provideAppInitializer(() => inject(AnimationHandlerService).init()),
		provideAppInitializer(() => inject(LanguageHandlerService).init()),
		provideTransloco({
			config: {
				availableLangs: ["en", "ro", "ru"],
				fallbackLang: "en",
				prodMode: !isDevMode(),
				reRenderOnLangChange: true,
				failedRetries: 2
			},
			loader: TranslocoHttpLoader
		}),
		provideHttpClient(
			withInterceptorsFromDi(),
			withInterceptors([
				authorizationInterceptor,
				requestLoggingInterceptor,
				timeoutInterceptor,
				authRefreshInterceptor,
				retryInterceptor,
				responseLoggingInterceptor
			])),
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes,
			withViewTransitions(),
			withRouterConfig({
				onSameUrlNavigation: "reload"
			})
		),
		provideClientHydration(withEventReplay()),
		provideAnimations()
	]
};