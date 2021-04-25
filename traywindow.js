"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitTray = void 0;
var electron_1 = require("electron");
var trayWindow = require("electron-tray-window");
var path = require("path");
var MainTray;
var TrayWindow;
function InitTray(contextMenu) {
    var iconName = './src/assets/icons/logo.ico';
    var iconPath = path.join(__dirname, iconName);
    MainTray = new electron_1.Tray(electron_1.nativeImage.createFromPath(iconPath));
    MainTray.setContextMenu(contextMenu);
    TrayWindow = new electron_1.BrowserWindow({
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        useContentSize: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            backgroundThrottling: false
        }
    });
    TrayWindow.setMenu(null);
    TrayWindow.loadURL("file://" + path.join(__dirname, "src/loading.html"));
    trayWindow.setOptions({ tray: MainTray, window: TrayWindow });
    trayWindow.setWindowSize({
        width: 411,
        height: 530,
        margin_x: -100,
        margin_y: -5
    });
}
exports.InitTray = InitTray;
//# sourceMappingURL=traywindow.js.map