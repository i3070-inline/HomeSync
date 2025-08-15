import {Injectable} from "@angular/core";
import {Event, NavigationEnd, NavigationStart, Router} from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class RouterLoggerService {
	constructor(router: Router) {
		console.log("RouterLoggerService initialized");
		router.events.subscribe((event: Event) => {
			if (event instanceof NavigationStart) console.log("NavigationStart:", event.url);
			if (event instanceof NavigationEnd) console.log("NavigationEnd:", event.url);
		});
	}
}