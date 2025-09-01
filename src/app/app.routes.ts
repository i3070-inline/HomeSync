import {Routes} from "@angular/router";
import {App} from "./app";
import {guestGuard} from "@guards/guest.guard";
import {authGuard} from "@guards/auth.guard";

export const routes: Routes = [
	{
		path: "",
		component: App,
		children: [
			{
				path: "",
				redirectTo: "main/me",
				pathMatch: "full"
			},
			{
				path: "login",
				loadComponent: () => import("@pages/login-page/login-page").then(value => value.LoginPage),
				canActivate: [guestGuard]
			},
			{
				path: "main/me",
				loadComponent: () => import("@pages/main-page/main-page").then(value => value.MainPage),
				canActivate: [authGuard],
				runGuardsAndResolvers: "always"
			},
			{
				path: "email-confirmation",
				loadComponent: () => import("@pages/email-confirmation-page/email-confirmation-page").then(value => value.EmailConfirmationPage)
			},
			{
				path: "error/:code",
				loadComponent: () => import("@pages/errors-page/errors-page").then(value => value.ErrorsPage)
			},
			{
				path: "**",
				redirectTo: "error/404"
			}
		]
	}
];
