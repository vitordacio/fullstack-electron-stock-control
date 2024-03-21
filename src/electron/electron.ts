import * as path from 'path';
import { app, BrowserWindow, shell } from 'electron';
// import * as url from 'url';

function createWindow() {
  const mainWindow = new BrowserWindow({
    resizable: true,
    autoHideMenuBar: true,
    frame: true,
    maximizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.maximize();

  mainWindow.webContents.setWindowOpenHandler(edata => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, '../../dist/index.html'),
  //     protocol: 'file:',
  //     slashes: true,
  //   }),
  // );

  mainWindow.loadURL('http://localhost:3000');
  // mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));

  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function handleActivate() {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
