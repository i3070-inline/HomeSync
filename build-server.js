const fs = require('fs');
const path = require('path');

const serverPath = 'dist/HomeSync/server/server.mjs';
const functionsDir = 'netlify/functions';

console.log('Verificăm server-ul la:', serverPath);

if (!fs.existsSync(functionsDir)) {
	fs.mkdirSync(functionsDir, {recursive: true});
	console.log('Creat director:', functionsDir);
}

if (fs.existsSync(serverPath)) {
	// Creează wrapper pentru Netlify Functions
	const serverWrapper = `
const { app } = require('../../dist/HomeSync/server/server.mjs');

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    const req = {
      url: event.path || event.rawUrl,
      method: event.httpMethod,
      headers: event.headers || {},
      body: event.body
    };

    let body = '';
    const res = {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      write: (chunk) => { body += chunk; },
      end: (chunk) => {
        if (chunk) body += chunk;
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      },
      setHeader: (name, value) => {
        res.headers[name] = value;
      }
    };

    try {
      app(req, res);
    } catch (error) {
      reject(error);
    }
  });
};`;

	fs.writeFileSync(path.join(functionsDir, 'server.js'), serverWrapper);
	console.log('✅ Server wrapper creat pentru Netlify Functions');
} else {
	console.error('❌ Server-ul Angular nu a fost găsit:', serverPath);
}