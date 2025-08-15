import {Component, inject} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {LanguageHandlerService} from "@services/language-handler.service";
import {AnimationHandlerService} from "@services/animation-handler.service";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: "./app.html",
	styleUrl: "./app.scss"
})
export class App {
	private languageHandler = inject(LanguageHandlerService);
	private animationHandler = inject(AnimationHandlerService)
}
