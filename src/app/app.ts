import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {LoadPlaceholderComponent} from "@components/load-placeholder-component/load-placeholder.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet,
		LoadPlaceholderComponent],
	templateUrl: "./app.html",
	styleUrl: "./app.scss"
})
export class App {
}
