import {Routes} from "@angular/router";
import {App} from "./app";
import {loginGuard} from "@guards/login.guard";
import {authGuard} from "@guards/auth.guard";

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
				path: "login",
				loadComponent: () => import("@pages/login-page/login-page").then(value => value.LoginPage),
				canActivate: [loginGuard]

			},
			{
				path: "main",
				loadComponent: () => import("@pages/main-page/main-page").then(value => value.MainPage),
				canActivate: [authGuard]
			}
		]
	}
];
