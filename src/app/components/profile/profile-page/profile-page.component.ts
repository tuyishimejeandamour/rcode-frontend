import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JerwisService } from 'app/core/services';
import { HttpprofileService } from 'app/core/services/profile/httpprofile.service';
import { TouchBarSlider } from 'electron';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit,AfterViewInit {

  @ViewChild('intialselect', {read: ElementRef})  initialclick:ElementRef;
  public inspire: any;
  constructor(
    private httpser:HttpprofileService,
    private user:JerwisService
  ) { }

  ngOnInit(): void {
    this.getinsipiration();
  }
  ngAfterViewInit(): void {
    this.initialclick.nativeElement.click();

  }
  getinsipiration():void{
    this.httpser.getinspiration(this.user.getUser().id).subscribe(
      data => this.inspire = data,
      error => console.log(error)
    )

  }
}


