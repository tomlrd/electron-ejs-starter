window.addEventListener("DOMContentLoaded", () => {
  console.log('Preload.js');
  // Expose des fonctions d'envoi IPC mais PAS l'api electron 
  // https://www.electronjs.org/fr/docs/latest/tutorial/ipc#2-expose-ipcrendereron-via-preload
  // todo : ipcMain.invoke system
  const { ipcRenderer, contextBridge } = require('electron');
  contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(
      channel,
      (event, ...args) => func(args)
    )
  })
});

