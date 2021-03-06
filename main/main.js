const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ejse = require('ejs-electron')

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../renderer/preload.js"),
    },
  });
}

var todos = []
ejse.data({
  todos: todos
})
app.on("ready", async () => {
  let rendererPath = path.normalize(path.join(__dirname, '../renderer/index.ejs'));
  createWindow();
  mainWindow.loadURL(rendererPath);
  //mainWindow.webContents.openDevTools({mode: "detach"});
});

ipcMain.on('create:todo', async (e, todo) => {
  if (!todos.includes(todo)) {
    todos.push(todo)
    mainWindow.webContents.send("fetch:todos", todos);
  }
})
ipcMain.on('remove:todo', async (e, todo) => {
  let index = todos.indexOf(todo)
  if (index !== -1) {
    todos.splice(index, 1);
    mainWindow.webContents.send("fetch:todos", todos);
  }
})
