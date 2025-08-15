import {Component, inject} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {RouterLoggerService} from "@services/router-logger.service";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: "./app.html",
	styleUrl: "./app.scss"
})
export class App {
	//private logger = inject(RouterLoggerService);
}
