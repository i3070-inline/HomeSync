const API_BASE_URL = "http://localhost:3001";
export const restEndpoints = {
	user: {
		authentification: `${API_BASE_URL}/auth/login`,
		register: `${API_BASE_URL}/auth/register`,
		emailConfirmation: `${API_BASE_URL}/auth/email-confirmation?token=`,
		refreshToken: `${API_BASE_URL}/auth/refresh`,
		logout: `${API_BASE_URL}/auth/logout`,
		me: `${API_BASE_URL}/auth/me`,
	}
} as const;