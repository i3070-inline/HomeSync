import {Routes} from "@angular/router";
import {App} from "./app";
import {guestGuard} from "@guards/guest.guard";
import {authGuard} from "@guards/auth.guard";
import {emailConfirmationResolver} from "@resolvers/email-confirmation.resolver";

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
				canActivate: [guestGuard]
			},
			{
				path: "main",
				loadComponent: () => import("@pages/main-page/main-page").then(value => value.MainPage),
				canActivateChild: [authGuard],
				children: [
					{
						path: "",
						redirectTo: "home",
						pathMatch: "full"
					},
					{
						path: "home",
						loadComponent: () => import("@main-sub-pages/settings-page/settings-page").then(value => value.SettingsPage),
					}
					, {
						path: "settings",
						loadComponent: () => import("@main-sub-pages/settings-page/settings-page").then(value => value.SettingsPage)
					}
				]
			},
			{
				path: "email-confirmation",
				loadComponent: () => import("@pages/email-confirmation-page/email-confirmation-page").then(value => value.EmailConfirmationPage),
				resolve: {confirmed: emailConfirmationResolver}
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
