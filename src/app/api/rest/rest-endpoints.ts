const API_BASE_URL = "http://localhost:3001";
export const restEndpoints = {
	user: {
		authentification: `${API_BASE_URL}/auth/login`,
		register: `${API_BASE_URL}/auth/register`,
		emailConfirmation: `${API_BASE_URL}/auth/confirm-email?token=`,
		refreshToken: `${API_BASE_URL}/auth/refresh`,
	}
} as const;