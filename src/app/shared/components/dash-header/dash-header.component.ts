/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'app/core/services';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss']
})
export class DashHeaderComponent implements OnInit {

  constructor(private electron: ElectronService) { }

  ngOnInit(): void {
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
