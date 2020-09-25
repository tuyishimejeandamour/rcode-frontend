import { Component, OnInit } from '@angular/core';
import { 
  JerwisService,
  TokenService ,
  AuthService } from 'app/core/services'
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  public Form ={
    email:null,
    password:null
  }
  constructor(
    private Jerwis: JerwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
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

  public Error = null;
  ngOnInit(): void {
  }
  onsubmit(): void {
    this.loading = true;
    this.Jerwis.login(this.Form).subscribe(
      data=>this.HandleResponse(data),
      error=>this.HandlError(error)
    )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  HandlError(error: { error: { error: any; }; }):void {
    this.loading = false;
    this.Error= error.error.error;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  HandleResponse(data){
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl("/profile");
    this.loading = false;
    console.log(data)

  }

}
