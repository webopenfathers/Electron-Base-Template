const { app, BrowserWindow, ipcMain } = require('electron')

// 创建窗口
const mainWindow = function () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  win.loadFile('./page/index.html')

  // 渲染进程和主进程通信
  ipcMain.on('open-dev-tools', () => {
    win.webContents.openDevTools()
  })

  ipcMain.on('close-dev-tools', () => {
    win.webContents.closeDevTools()
  })

  // 主进程向渲染进程发送消息
  ipcMain.handle('get-version-info', () => {
    return process.versions
  })
}

// electron运行完毕---加载窗口
app.whenReady().then(mainWindow)
