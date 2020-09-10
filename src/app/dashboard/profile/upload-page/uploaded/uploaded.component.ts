import { Component, ViewChild, OnInit } from '@angular/core';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface taskcorrected{
  taskname:string;
  givenat:string;
  submittedat:string;
  marks:string;
}

@Component({
  selector: 'app-uploaded',
  templateUrl: './uploaded.component.html',
  styleUrls: ['./uploaded.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'block',
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('open <=> closed', [
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),

    ]),
  ],
})
export class UploadedComponent implements OnInit {
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(
    private contextMenuService: ContextMenuService,
  ) { }
  markedtask:taskcorrected[]=[
    {
      taskname:'headers',
      givenat:'14/12/2021',
      submittedat:'16/12/2021',
      marks:'30/30'

    },
    {
      taskname:'headers',
      givenat:'14/12/2021',
      submittedat:'16/12/2021',
      marks:'30/30'

    },
    {
      taskname:'headers',
      givenat:'14/12/2021',
      submittedat:'16/12/2021',
      marks:'30/30'

    },
    {
      taskname:'headers',
      givenat:'14/12/2021',
      submittedat:'16/12/2021',
      marks:'30/30'

    }

  ];
  ngOnInit(): void {
  }
  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
  onContextMenu($event: MouseEvent, item:taskcorrected): void {
    this.contextMenuService.show.next({
      contextMenu: this.basicMenu,
      event: $event,
      item: item

    });
    $event.preventDefault();
    $event.stopPropagation();
  }

}
