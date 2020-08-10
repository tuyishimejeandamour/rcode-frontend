import { Component, ViewChild, OnInit } from '@angular/core';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
@Component({
  selector: 'app-landingupload',
  templateUrl: './landingupload.component.html',
  styleUrls: ['./landingupload.component.scss']
})
export class LandinguploadComponent implements OnInit {

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(
    private contextMenuService: ContextMenuService,
  ) { }

  ngOnInit(): void {
  }
  onContextMenu($event: MouseEvent, item: any): void {
    this.contextMenuService.show.next({
      contextMenu: this.basicMenu,
      event: $event,
      item: item

    });
    $event.preventDefault();
    $event.stopPropagation();
  }


}
