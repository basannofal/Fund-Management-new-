const { app, BrowserWindow } = require("electron");


let mainwindow;
app.on("ready", () => {
    mainwindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    })
    mainwindow.loadURL(`${app.getAppPath}\\build\index.html`)
})