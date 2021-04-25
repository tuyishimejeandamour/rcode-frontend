import { ipcRenderer } from 'electron';


 export function open() {
  ipcRenderer.send('newWindow','main.html');
}
