export function getCookieValueFromRequest(req: Request | null, cookieKey: string): string | null {
	if (!req) return null;
	const cookieHeader = req.headers.get("cookie") || "";
	const cookies = Object.fromEntries(
		cookieHeader
			.split(";")
			.map(c => c.trim().split("="))
			.map(([k, v]) => [k, decodeURIComponent(v)])
	);
	return cookies[cookieKey] || null;
}