/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import {
  JerwisService,
  TokenService } from 'app/core/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public Form = {
    firstname:null,
    lastname:null,
    username : null,
    email:null,
    password:null,
    password_confirmation:null
  };
  public Error = [];


  constructor(
    private Jerwis:JerwisService,
    private Token: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onsubmit(): void{
    this.Jerwis.signup(this.Form).subscribe(
      data=>this.handleesponse(data),
      error=>this.HandlError(error)
    )
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  HandlError(error):void {
    this.Error= error.error.errors;
  }
  handleesponse(data){
    this.Token.handle(data.access_token);
    this.router.navigateByUrl("/profile");
  }
}
