import {Routes} from "@angular/router";
import {App} from "./app";
import {guestGuard} from "@guards/guest.guard";
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
				canActivate: [guestGuard]
			},
			{
				path: "main/me",
				loadComponent: () => import("@pages/main-page/main-page").then(value => value.MainPage),
				canActivate: [authGuard],
				runGuardsAndResolvers: "always",
			},
			{
				path: "email-confirmation",
				loadComponent: () => import("@pages/email-confirmation-page/email-confirmation-page").then(value => value.EmailConfirmationPage)
			},
			{
				path: "not-found",
				loadComponent: () => import("@pages/not-found-page/not-found-page").then(value => value.NotFoundPage)
			}
		]
	}
];
