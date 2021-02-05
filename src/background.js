"use strict";
import { app, protocol, BrowserWindow, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

// import { updateHandle } from "./update";
// import { autoUpdater } from "electron-updater";
import { checkUpdate } from "@/common/checkUpdater";
// import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
var ipcMain = require("electron").ipcMain;
var electron = require("electron");
import common from "./common/IpcCommon";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let newWindow = null;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    // width: 800,
    // height: 600,
    fullscreen: true, // 全屏
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity: false //取消跨域限制
    }

    //设置登录窗口图表，这里的${__static}对应的是public目录
    // icon: `${__static}/app.ico`
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // win.loadURL("https://bijieysp.e-tecsun.com/terminal/api/terminal/index");
    console.log(
      "process.env.WEBPACK_DEV_SERVER_URL" + process.env.WEBPACK_DEV_SERVER_URL
    );
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
    // autoUpdater.checkForUpdatesAndNotify();
    checkUpdate(window);
    // updateHandle(win);
    // require("update-electron-app")();
  }

  win.on("closed", () => {
    win = null;
  });
  //清楚菜单栏
  createMenu();
  //主进程监听事件 监听主屏幕发送信息扩展屏幕
  console.log("CC_MAIN_MSG", common.CC_MAIN_MSG);
  ipcMain.on(common.CC_MAIN_MSG, (event, obj) => {
    console.log("ipcMain CC_MAIN_MSG", obj);
    if (newWindow) {
      newWindow.webContents.send(common.CC_MAIN_MSG, obj);
    }
  });
  //主进程监听扩展屏幕发送信息到主屏幕
  ipcMain.on(common.CC_EXTENSION_MSG, (event, res) => {
    console.log(" ipcMain CC_EXTENSION_MSG", res);
    if (win) {
      win.webContents.send(common.CC_EXTENSION_MSG, res);
    }
  });
  //设置版本更新地址，即将打包后的latest.yml文件和exe文件同时放在
  //http://xxxx/test/version/对应的服务器目录下,该地址和package.json的publish中的url保持一致
  // let feedUrl = "http://xxxx/test/version/";
  // //检测版本更新
  // updateHandle(win);
}

/**
 * 创建另外的窗口
 */
function createOtherWin() {
  var newURL = "http://121.37.195.144:8010/#/people/index";
  let displays = electron.screen.getAllDisplays();
  let externalDisplay = displays.find(display => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });
  if (externalDisplay) {
    newWindow = new BrowserWindow({
      fullscreen: true,
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      webPreferences: {
        nodeIntegration: true
      }
    });
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      newURL = process.env.WEBPACK_DEV_SERVER_URL + "/extension.html#/";
      console.log("newURL=" + newURL);
      newWindow.loadURL(newURL);
      newWindow.webContents.openDevTools();
    } else {
      createProtocol("app");
      //   // Load the index.html when not in development
      newWindow.loadURL("app://./extension.html");
    }
    newWindow.on("closed", () => {
      //这一段放外面的话，如果你电脑没双屏会报错。
      newWindow = null;
    });
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      // await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  // 在开发环境和生产环境均可通过快捷键打开devTools
  // globalShortcut.register("CommandOrControlShifti", function() {
  //   win.webContents.openDevTools();
  // });

  createWindow();
  createOtherWin();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
/**
 * 设置菜单栏
 */
function createMenu() {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === "darwin") {
    const template = [
      {
        label: "App Demo",
        submenu: [
          {
            role: "about"
          },
          {
            role: "quit"
          }
        ]
      }
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null);
  }
}
