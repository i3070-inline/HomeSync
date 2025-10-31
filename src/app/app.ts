import {ApplicationRef, Component, inject} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {LoadPlaceholderComponent} from "@components/load-placeholder-component/load-placeholder.component";
import {filter, take} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet,
		LoadPlaceholderComponent],
	templateUrl: "./app.html",
	styleUrl: "./app.scss"
})
export class App {
	//region Members
	private appRef = inject(ApplicationRef);
	public isHydrated = toSignal(this.appRef.isStable.pipe(
		filter(is => is),
		take(1)
	), {initialValue: false});
	//endregion
}
