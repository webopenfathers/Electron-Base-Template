const { app, BrowserWindow, ipcMain, WebContentsView } = require('electron')

const path = require('path')

// 创建窗口
const mainWindow = function () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
  })

  win.loadFile('./page/index.html')
  win.setMenu(null)
  let [width, height] = win.getContentSize()

  let webview = null
  // 创建webview
  // 监听渲染进程发送的消息
  ipcMain.on('create-webview', () => {
    if (webview === null) {
      webview = new WebContentsView()
      webview.setBounds({ x: 0, y: 40, width, height: height - 40 }) // 设置webview的宽高
      win.contentView.addChildView(webview) // 添加webview到win窗口
    }
  })

  ipcMain.on('search-loadurl', (event, url) => {
    webview.webContents.loadURL(url)
  })

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

  // 监听win窗口变化
  win.on('resize', () => {
    let [width, height] = win.getContentSize()
    if (webview) {
      webview.setBounds({ x: 0, y: 40, width, height: height - 40 }) // 设置webview的宽高
    }
  })
}

// electron运行完毕---加载窗口
app.whenReady().then(mainWindow)
