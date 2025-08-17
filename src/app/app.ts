import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {ThemeHandlerService} from "@services/theme-handler.service";
import {AnimationHandlerService} from "@services/animation-handler.service";
import {LanguageHandlerService} from "@services/language-handler.service";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: "./app.html",
	styleUrl: "./app.scss"
})
export class App {
	constructor(
		private languageHandler: LanguageHandlerService,
		private animationHandler: AnimationHandlerService,
		private themeHandler: ThemeHandlerService)
	{
		console.log("App initialized");
	}
}
