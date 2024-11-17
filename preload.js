// 预加载脚本

const { contextBridge, ipcRenderer } = require('electron')

// contextBridge 主进程和渲染进程的连接桥梁
// exposeInMainWorld 可以暴露一些方法给渲染进程
// 参数一：给渲染进程的名字
// 参数二：暴露的内容
contextBridge.exposeInMainWorld('tools', {
  ipcSend: (msg, ...args) => {
    ipcRenderer.send(msg, ...args)
  },

  ipcInvoke: (msg) => {
    return ipcRenderer.invoke(msg)
  },
})

contextBridge.exposeInMainWorld('versions', {
  chrome: () => {
    return process.versions.chrome
  },
  electron: () => {
    return process.versions.electron
  },
  node: () => {
    return process.versions.node
  },
})
