import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from "@angular/core";
import {PreloadAllModules, provideRouter, withPreloading, withViewTransitions} from "@angular/router";
import {routes} from "./app.routes";
import {provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {CookieService} from "ngx-cookie-service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {EffectCards} from "swiper/modules";
import SwiperCore from "swiper";
import {provideTranslateService} from "@ngx-translate/core";

SwiperCore.use([EffectCards]);
export const appConfig: ApplicationConfig = {
	providers: [
		CookieService,
		provideTranslateService(),
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes,
			withPreloading(PreloadAllModules),
			withViewTransitions()),
		provideClientHydration(withEventReplay()),
		provideAnimations()
	]
};
