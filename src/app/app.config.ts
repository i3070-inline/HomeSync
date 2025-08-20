import {
	ApplicationConfig,
	importProvidersFrom,
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
import {JwtModule} from "@auth0/angular-jwt";
import {JwtService} from "@services/jwt.service";
import {ThemeHandlerService} from "@services/theme-handler.service";
import {AnimationHandlerService} from "@services/animation-handler.service";
import {provideTransloco} from "@ngneat/transloco";
import {TranslocoHttpLoader} from "@services/transloco-loader.service";
import {LanguageHandlerService} from "@services/language-handler.service";

SwiperCore.use([EffectCards]);
export const appConfig: ApplicationConfig = {
	providers: [
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
		importProvidersFrom(
			JwtModule.forRoot({
				config: {
					tokenGetter: () => inject(JwtService).getToken(),
					allowedDomains: [/.*/],
					disallowedRoutes: ["/auth/login", "/auth/confirm-email"]
				}
			})
		),
		provideHttpClient(
			withInterceptorsFromDi(),
			withInterceptors([
				requestLoggingInterceptor,
				responseLoggingInterceptor,
				retryInterceptor
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