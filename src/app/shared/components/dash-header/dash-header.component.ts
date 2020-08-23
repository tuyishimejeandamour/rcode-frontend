/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'app/core/services';
import { Router } from '@angular/router';
import { JerwisService, User } from 'app/Service/jerwis.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss']
})
export class DashHeaderComponent implements OnInit {

  public data: User;
  constructor(
    private electron: ElectronService,
    private link: Router,
    private jewris: JerwisService
  ) { }

  ngOnInit(): void {
    this.jewris.initfuntion();
    this.data = this.jewris.getUser();
  }
  gohome(value: string): void{
    this.link.navigateByUrl(value)
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
