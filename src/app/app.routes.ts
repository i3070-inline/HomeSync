import {Routes} from "@angular/router";
import {App} from "@beforeApp/src/app/app";

export const routes: Routes = [
	{
		path: "",
		component: App,
		children: [
			{
				path: "",
				redirectTo: "main",
				pathMatch: "full"
			},
			{
				path: "main",
				loadComponent: () => import("@pages/login-page/login-page").then(value => value.LoginPage)
			}
		]
	}
];
