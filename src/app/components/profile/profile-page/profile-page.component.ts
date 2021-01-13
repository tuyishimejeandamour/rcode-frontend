import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TouchBarSlider } from 'electron';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  @ViewChild('intialselect') public initialclick:ElementRef;
  constructor() { }

  ngOnInit(): void {
    this.initialclick.nativeElement.click();
  }

}


