export default async function handler(req, res) {
	const {handler: angularHandler} = await import('../dist/HomeSync/server/server.mjs');
	return angularHandler(req, res);
}