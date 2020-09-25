import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JerwisService } from 'app/core/services';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  public error = [];
  public Form = {
    email:null,
    password:null,
    password_conformation:null,
    reset_token:null

  }

  constructor(
    private route: ActivatedRoute,
    private jervis: JerwisService
  ) {
    route.queryParams.subscribe( params =>{
      this.Form.reset_token = params["token"];
    })

  }

  ngOnInit(): void {
  }
  onsubmit():void{
    this.jervis.newpasswordIn(this.Form).subscribe(
      data=>this.HandleResponse(data),
      error=>this.HandlError(error)
    )

  }
  HandleResponse(data):void{

  }
  HandlError(error){

  }
}
