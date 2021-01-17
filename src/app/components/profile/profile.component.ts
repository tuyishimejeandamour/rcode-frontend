import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { ElectronService } from 'app/core/services';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public loading = false;
  public autoLogoutMins=1;
  public autoLogoutTimer = 0;
  constructor(
    private router: Router,
    private electron: ElectronService,
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngOnInit(): void {
    if(!this.electron.isElectron){
      document.getElementById('nav_around').style.height='30px';
      document.getElementById('float-17').style.top='0px';
      document.getElementById('content').style.height="calc(100% - 95px)";
    }
  }
  get(a:string):HTMLElement{
    return document.getElementById(a)
  }


}
