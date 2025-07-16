import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from "@angular/core";
import {PreloadAllModules, provideRouter, withPreloading, withViewTransitions} from "@angular/router";
import {routes} from "./app.routes";
import {provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideTranslateService} from "@ngx-translate/core";
import SwiperCore, {EffectCards} from "@swiper-base";

SwiperCore.use([EffectCards]);
export const appConfig: ApplicationConfig = {
	providers: [
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
