import { BrowserWindow, nativeImage, Tray } from 'electron';
import * as trayWindow from 'electron-tray-window';
import * as path from 'path';
import * as url from 'url';

let MainTray:Tray| undefined;
let TrayWindow: BrowserWindow | undefined;


export function InitTray(){
  const iconName = './src/assets/icons/logo.ico';
  const iconPath = path.join(__dirname, iconName);
  MainTray = new Tray(nativeImage.createFromPath(iconPath));
  TrayWindow = new BrowserWindow({
    show:false,
    frame:false,
    fullscreenable:false,
    resizable:false,
    useContentSize:false,
    transparent:true,
    alwaysOnTop:true,
    webPreferences:{
      backgroundThrottling:false
    }

  });

  TrayWindow.setMenu(null);
  TrayWindow.loadURL(`file://${path.join(__dirname, "src/loading.html")}`);
  trayWindow.setOptions({tray: MainTray,window: TrayWindow});
  trayWindow.setWindowSize({
    width    : 411,
    height   : 530,
    margin_x : -100,  //optional
    margin_y : -5

});
}

