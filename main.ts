import { app, BrowserWindow, ipcMain, Menu, screen, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { InitTray } from './traywindow';
import * as contextMenu from 'electron-context-menu'
import { appendFileSync } from 'fs';
import * as fs from 'fs'
import * as os from 'os'

let win: BrowserWindow = null;
let deeplinkingUrl;
const gotTheLock = app.requestSingleInstanceLock();
if (gotTheLock) {
  app.on('second-instance', (e, argv) => {
    // Someone tried to run a second instance, we should focus our window.

    // Protocol handler for win32
    // argv: An array of the second instance’s (command line / deep linked) arguments
    if (process.platform == 'win32') {
      // Keep only command line / deep linked arguments
      deeplinkingUrl = argv.slice(1)
    }
    logEverywhere('app.makeSingleInstance# ' + deeplinkingUrl)

    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
} else {
  app.quit()
}
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');
  contextMenu({
    prepend: (defaultActions, parameters, browserWindow) => [
      {
        label: 'Search Google for “{selection}”',
        visible: parameters.selectionText.trim().length > 0,
        click: () => {
          shell.openExternal(`https://google.com/search?q=${encodeURIComponent(parameters.selectionText)}`);
        }
      }
    ]
  });

  function logEverywhere(s) {
    console.log(s)
    if (win && win.webContents) {
      win.webContents.executeJavaScript(`console.log("${s}")`)
    }
  }
function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    frame:false,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule : true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  win.webContents.on('will-navigate', function(e, reqUrl) {
    let getHost = url=>require('url').parse(url).host;
    let reqHost = getHost(reqUrl);
    let isExternal = reqHost && reqHost !== getHost(win.webContents.getURL());
    if(isExternal) {
      e.preventDefault();
      shell.openExternal(reqUrl, {});
    }
  })
  if (serve) {

    win.webContents.openDevTools();
 if (process.platform == 'win32') {
    // Keep only command line / deep linked arguments
    deeplinkingUrl = process.argv.slice(1)
  }
  logEverywhere('createWindow# ' + deeplinkingUrl)
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}


try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  let tray= null;
  const contextMenu = Menu.buildFromTemplate([
    {
        label: 'Open', click: function () {
            win.show()
        }
    },
    {
        label: 'Quit', click: function () {
            app.quit()
        }
    }
  ])
  app.on('ready', () =>{
     setTimeout(createWindow, 400);
     InitTray(contextMenu)
    }
    );

  // Quit when all windows are closed.
  app.on('window-all-closed', (event) => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        win.hide();
    }
  });
 app.on('quit',(event)=>{
    event.preventDefault();
    win.hide();
});
//  app.on('quit',(event)=>{
//     event.preventDefault();
//     app.hide();
// });




  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
if (!app.isDefaultProtocolClient('myapp')) {
  // Define custom protocol handler. Deep linking works on packaged versions of the application!
  app.setAsDefaultProtocolClient('myapp')
}

app.on('will-finish-launching', function() {
  // Protocol handler for osx
  app.on('open-url', function(event, url) {
    event.preventDefault()
    deeplinkingUrl = url
    logEverywhere('open-url# ' + deeplinkingUrl)
  })
})
ipcMain.on('newWindow',  e => {
  console.log("new is to be created"+e)
});
ipcMain.on('print-to-pdf', event => {
  const name = new Date().toString()+"homework.pdf"
  const pdfPath = path.join(os.tmpdir(), name);
  const win = BrowserWindow.fromWebContents(event.sender);

  win.webContents.printToPDF({marginsType: 1, pageSize:'Tabloid'}).then( (data)=>{
    fs.writeFile(pdfPath, data, err => {
      if (err) return console.log(err.message);
      shell.openExternal('file://' + pdfPath);
      event.sender.send('wrote-pdf', pdfPath);
    })

  }).catch((error) => {
    throw error;
 })
});
