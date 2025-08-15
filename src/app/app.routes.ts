import {Routes} from "@angular/router";
import {App} from "./app";
import {loginGuard} from "@guards/login.guard";
import {authGuard} from "@guards/auth.guard";
import {LoginPage} from "@pages/login-page/login-page";

export const routes: Routes = [
	{
		path: "",
		component: App,
		children: [
			{
				path: "",
				redirectTo: "login",
				pathMatch: "full"
			},
			{
				path: "login",
				component: LoginPage,
				canActivate: [loginGuard]
			},
			{
				path: "main/me",
				loadComponent: () => import("@pages/main-page/main-page").then(value => value.MainPage),
				canActivate: [authGuard],
				runGuardsAndResolvers: "always"
			}
		]
	}
];
