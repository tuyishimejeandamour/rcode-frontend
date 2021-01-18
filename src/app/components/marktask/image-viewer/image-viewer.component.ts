import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from "@angular/core";
import { NgImageSliderComponent } from "ng-image-slider";


@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
  imageObject:Array<any>;
  @ViewChild('nav') slider: NgImageSliderComponent;
  @Input('images')
  set value(v : Array<any>) {
    this.imageObject = v;
  }

  constructor() {}

  ngOnInit():void {

  }

}


