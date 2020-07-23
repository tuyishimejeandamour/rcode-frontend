import { Component, OnInit } from '@angular/core';
import { JerwisService } from 'app/Service/jerwis.service';
import { TokenService } from 'app/Service/token.service';
import {  Router } from '@angular/router';
import { AuthService } from 'app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public Form ={
    email:null,
    password:null
  }
  constructor(
    private Jerwis: JerwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { }

  public Error = null;
  ngOnInit(): void {
  }
  onsubmit(): void {
    this.Jerwis.login(this.Form).subscribe(
      data=>this.HandleResponse(data),
      error=>this.HandlError(error)
    )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  HandlError(error: { error: { error: any; }; }):void {
    this.Error= error.error.error;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  HandleResponse(data){
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl("/profile");

  }

}
