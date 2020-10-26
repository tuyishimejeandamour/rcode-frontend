import { Component, OnInit } from '@angular/core';
import { JerwisService, TokenService , AuthService } from 'app/core/services'
import { Router } from '@angular/router';
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
  ) { }

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

  HandlError(error: { error: { error: any; }; }):void {
    this.loading = false;
    this.Error= error.error.error;
  }
  HandleResponse(data):void{
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl("/profile");
    this.loading = false;

  }

}
