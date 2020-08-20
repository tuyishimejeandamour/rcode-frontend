import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public style  = {};
  public style1  = {};
  public style2  = {};
  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log(event)
  }
  onResizeEnd1(event: ResizeEvent): void {
    this.style1 = {
      width: `${event.rectangle.width}px`
    };
  }
  onResizeEnd2(event: ResizeEvent): void {
    this.style2 = {
      width: `${event.rectangle.width}px`
    };
  }

}
