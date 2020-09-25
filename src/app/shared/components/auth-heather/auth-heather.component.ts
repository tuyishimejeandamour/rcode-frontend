/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../core/services/electron/electron.service'

@Component({
  selector: 'app-auth-heather',
  templateUrl: './auth-heather.component.html',
  styleUrls: ['./auth-heather.component.scss']
})
export class AuthHeatherComponent implements OnInit {
  isinbrowser: boolean;

  constructor(private electron: ElectronService) { }

  ngOnInit(): void {
    if(!this.electron.isElectron){
      this.isinbrowser = true;
    }
  }
  closewindow(): void{
    this.electron.window.close();
  }
  minimizewindow(): void {
    this.electron.window.minimize();
  }
  maximizewindow(): void {
    const changeimage = document.getElementById('maximize')!;
    changeimage.style.display="none";
    const displayimage = document.getElementById('restore')!;
    displayimage.style.display="block";
    this.electron.window.maximize();
  }
  restorewindow(): void{
    const changeimage = document.getElementById('maximize')!;
    changeimage.style.display="block";
    const displayimage = document.getElementById('restore')!;
    displayimage.style.display="none";
    this.electron.window.restore();
  }
}
