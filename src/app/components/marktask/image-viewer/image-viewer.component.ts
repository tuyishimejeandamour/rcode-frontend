import {
  Component,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  OnInit,
  Input
} from "@angular/core";
import {
  Gallery,
  GalleryItem,
  ThumbnailsPosition,
  ImageSize
} from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageViewerComponent implements OnInit {

  items: GalleryItem[];
  imageData:any;
  @ViewChild("itemTemplate", { static: true }) itemTemplate: TemplateRef<any>;
  @Input('images')
  set value(v :{srcUrl:string,previewUrl:string}[]) {
    this.imageData  = v;
  }

  constructor(public gallery: Gallery, public lightbox: Lightbox) {}

  ngOnInit():void {
    this.items = this.imageData.map(item => {
      return {
        type: "imageViewer",
        data: {
          src: item.srcUrl,
          thumb: item.previewUrl
        }
      };
    });

    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref("lightbox");

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
      itemTemplate: this.itemTemplate,
      gestures: false
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }
}


