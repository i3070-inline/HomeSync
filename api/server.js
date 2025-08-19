module.exports = async (req, res) => {
	try {
		console.log('Путь импорта: ../dist/HomeSync/server/server.mjs');
		const serverModule = await import('../dist/HomeSync/server/server.mjs');
		console.log('Импортирован модуль с ключами:', Object.keys(serverModule));

		// Проверяем оба возможных варианта экспорта
		const handler = serverModule.reqHandler || serverModule.default;

		if (!handler) {
			console.error('Handler не найден в модуле:', serverModule);
			return res.status(500).send('Handler not found');
		}

		await handler(req, res);
	} catch (error) {
		console.error('Ошибка импорта:', error.message, error.stack);
		res.status(500).send(`Error: ${error.message}`);
	}
};