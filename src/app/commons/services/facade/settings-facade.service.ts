import {inject, Injectable} from "@angular/core";
import {AnimationHandlerService} from "@services/animation-handler.service";
import {LanguageHandlerService} from "@services/language-handler.service";
import {ThemeHandlerService} from "@services/theme-handler.service";
import {applicationDetails} from "@constants/constants";

@Injectable({
	providedIn: "root"
})
export class SettingsFacadeService {
	//region Services
	public readonly animationHandler = inject(AnimationHandlerService);
	public readonly languageHandler = inject(LanguageHandlerService);
	public readonly themeHandler = inject(ThemeHandlerService);
	//endregion
	//Members
	public readonly appDetails = applicationDetails;
	//endregion
}
