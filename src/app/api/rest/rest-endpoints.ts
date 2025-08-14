import {environment} from "@beforeApp/environments/enviroment.local";

const API_BASE_URL = environment.apiUrl;
export const restEndpoints = {
	user: {
		authentification: `${API_BASE_URL}/auth/login`,
		register: `${API_BASE_URL}/auth/register`
	}
} as const;