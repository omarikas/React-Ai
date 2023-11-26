const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const main =require("./main")
const gpt =require("./gpt")
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,  webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'renderer', 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
const fs=require('fs')
ipcMain.on('user-inputs', async (event, srcPath, filePath) => {
    // Handle user inputs here
    console.log('Source Path:', srcPath);
    console.log('File Path:', filePath);
fs.readFile(path.resolve(`${srcPath}/${filePath}`),async (err,data)=>{


  
    // Send the user inputs back to the renderer process
    mainWindow.webContents.send('echo-user-inputs', 
await gpt.final(data.toString(),await main.main(srcPath,filePath)));

})
    
  });