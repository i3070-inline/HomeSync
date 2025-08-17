import {
	ApplicationConfig,
	importProvidersFrom,
	inject,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection
} from "@angular/core";
import {provideRouter, withRouterConfig, withViewTransitions} from "@angular/router";
import {routes} from "./app.routes";
import {provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import SwiperCore, {EffectCards} from "@swiper-base";
import {HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {requestLoggingInterceptor} from "@interceptors/request-logging.interceptor";
import {responseLoggingInterceptor} from "@interceptors/response-logging.intercepter";
import {retryInterceptor} from "@interceptors/retry-request.interceptor";
import {JwtModule} from "@auth0/angular-jwt";
import {JWT_KEY} from "@services/jwt.service";
import {PlatformService} from "@services/platform.service";

SwiperCore.use([EffectCards]);
export const appConfig: ApplicationConfig = {
	providers: [
		provideTranslateService({
			loader: {
				provide: TranslateLoader,
				useFactory: () => new TranslateHttpLoader(inject(HttpClient), "assets/languages/", ".json"),
				deps: [HttpClient]
			},

		}),
		importProvidersFrom(
			JwtModule.forRoot({
				config: {
					tokenGetter: () => {
						const platform = inject(PlatformService);
						return platform.runOnBrowserPlatform(() => localStorage.getItem(JWT_KEY)) || null;
					},
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
		provideAnimations(),
	]
};