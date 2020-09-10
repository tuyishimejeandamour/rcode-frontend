import { Component, OnInit } from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogAssignComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() { }
  split: SplitComponent;
  area1: SplitAreaDirective;
  area2: SplitAreaDirective;  
  direction = 'horizontal'
  sizes = {
    percent: {
      area1: 70,
      area2: 30,
    }
  } 
  dragEnd({sizes}):void {
    
    this.sizes.percent.area1 = sizes[0];
    this.sizes.percent.area2 = sizes[1]; 
  }
  ngOnInit(): void {
  }

}
