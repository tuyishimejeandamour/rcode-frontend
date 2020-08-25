import { Component, OnInit} from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';


@Component({
  selector: 'app-marktask',
  templateUrl: './marktask.component.html',
  styleUrls: ['./marktask.component.scss']
})
export class MarktaskComponent implements OnInit {
  
 
  constructor() {
  
  }
  

  split: SplitComponent;
  area1: SplitAreaDirective;
  area2: SplitAreaDirective;
  area3: SplitAreaDirective;
  
  direction = 'horizontal'
  sizes = {
    percent: {
      area1: 20,
      area2: 40,
      area3: 40,
    }
  } 
  dragEnd({sizes}):void {
    
    this.sizes.percent.area1 = sizes[0];
    this.sizes.percent.area2 = sizes[1];
    this.sizes.percent.area3 = sizes[2];
    
  }



  ngOnInit(): void {
  }

}
