/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { JerwisService } from 'app/Service/jerwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public Form ={
    email:null,
  }

  constructor(
    private Jerwis: JerwisService,
    private notify: SnotifyService
  ) { }

  ngOnInit(): void {
  }

  onsubmit(){
    this.Jerwis.reset(this.Form).subscribe(
      data=>this.handleError(data),
      error=>this.notify.error(error.error.error)
    )

  }

  handleError(data){
    this.Form.email=null
  }


}
