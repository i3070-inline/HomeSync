const {app, BrowserWindow} = require('electron');
const path = require('path');
let mainWindow;
async function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		minWidth: 400,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
		},
	});
	await mainWindow.loadURL('https://homesync-9jub.onrender.com');
	//await mainWindow.loadFile(path.join(__dirname, 'dist', 'smart-house-application', 'browser',
	// 'index.html'));//browser
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
app.on('activate', async () => {
	if (BrowserWindow.getAllWindows().length === 0) await createWindow();
});

