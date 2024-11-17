const { app, BrowserWindow } = require('electron')

// 创建窗口
const mainWindow = function () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  win.loadFile('./page/index.html')
}

// electron运行完毕---加载窗口
app.whenReady().then(mainWindow)
