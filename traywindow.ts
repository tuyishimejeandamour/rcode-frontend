import { BrowserWindow, nativeImage, Tray } from 'electron';
import * as trayWindow from 'electron-tray-window';
import * as path from 'path';
import * as url from 'url';

let MainTray:Tray| undefined;
let TrayWindow: BrowserWindow | undefined;


export function InitTray(){
  const iconName = './assets/icons/logo.ico';
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
  TrayWindow.loadURL('https://stackblitz.com/edit/angular-susr5n?file=src/app/app.component.ts');
  trayWindow.setOptions({tray: MainTray,window: TrayWindow});
}

