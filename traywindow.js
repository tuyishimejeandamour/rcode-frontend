"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitTray = void 0;
var electron_1 = require("electron");
var trayWindow = require("electron-tray-window");
var path = require("path");
var MainTray;
var TrayWindow;
function InitTray() {
    var iconName = 'dist/assets/icons/logo.ico';
    var iconPath = path.join(__dirname, iconName);
    MainTray = new electron_1.Tray(electron_1.nativeImage.createFromPath(iconPath));
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
    TrayWindow.loadURL('https://stackblitz.com/edit/angular-susr5n?file=src/app/app.component.ts');
    trayWindow.setOptions({ tray: MainTray, window: TrayWindow });
    trayWindow.setWindowSize({
        width: 300,
        height: 400,
        margin_x: 1,
        margin_y: 1 //optional
    });
}
exports.InitTray = InitTray;
//# sourceMappingURL=traywindow.js.map