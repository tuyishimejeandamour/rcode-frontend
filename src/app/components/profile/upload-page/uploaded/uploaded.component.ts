import { Component, ViewChild, OnInit } from '@angular/core';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SubmittedTask, JerwisService, User, Submittedfiles } from 'app/core/services';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { SnotifyService } from 'ng-snotify';


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
  User:User;
  files:Submittedfiles[];
  fileopened= false;
  constructor(
    private contextMenuService: ContextMenuService,
    private httptask:HttptaskService,
    private notify:SnotifyService,
    private jerwis:JerwisService
  ) { }
  markedtask:SubmittedTask[]=[];
  ngOnInit(): void {
    this.User = this.jerwis.getUser();
    this.gettasks(this.User.id)
  }
  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
  onContextMenu($event: MouseEvent, item:SubmittedTask): void {
    this.contextMenuService.show.next({
      contextMenu: this.basicMenu,
      event: $event,
      item: item

    });
    $event.preventDefault();
    $event.stopPropagation();
  }
  gettasks(id:number):void{
    this.httptask.getsubmitedtask(id).subscribe(
      data=>{this.markedtask= data},
      error=> this.notify.error(error.error.error)
    )
  }
  getsubmittedfiles(folder:SubmittedTask):void{
    this.fileopened = true;
    if(folder.files != null && folder.files.length>0){
      this.files = folder.files;
    }

  }

}
