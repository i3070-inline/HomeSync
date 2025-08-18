const fs = require('fs');
const path = require('path');

const serverPath = 'dist/HomeSync/server/server.mjs';
const functionsDir = 'netlify/functions';
const functionPath = path.join(functionsDir, 'server.mjs');

console.log('Verificăm server-ul la:', serverPath);

if (!fs.existsSync(functionsDir)) {
	fs.mkdirSync(functionsDir, {recursive: true});
	console.log('Creat director:', functionsDir);
}

if (fs.existsSync(serverPath)) {
	fs.copyFileSync(serverPath, functionPath);
	console.log('✅ Server copiat în Netlify Functions');
	console.log('📁 Din:', serverPath);
	console.log('📁 În:', functionPath);
} else {
	console.error('❌ Server-ul Angular nu a fost găsit:', serverPath);
	console.log('📂 Verifică directorul dist:', fs.readdirSync('dist', {withFileTypes: true}).map(d => d.name));
}