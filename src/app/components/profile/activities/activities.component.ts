import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit,AfterViewInit {

  @ViewChild('intialselect', {read: ElementRef})  initialclick:ElementRef;
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.initialclick.nativeElement.click();

  }


}
