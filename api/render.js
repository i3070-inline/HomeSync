export default async function handler(request, response) {
	try {
		const {default: render} = await import('../dist/HomeSync/server/server.mjs');
		return render(request, response);
	} catch (error) {
		console.error('SSR Error:', error);
		const fs = await import('fs');
		const path = await import('path');
		const indexPath = path.join(process.cwd(), 'dist/HomeSync/browser/index.html');
		const html = fs.readFileSync(indexPath, 'utf-8');
		response.setHeader('Content-Type', 'text/html');
		return response.send(html);
	}
}