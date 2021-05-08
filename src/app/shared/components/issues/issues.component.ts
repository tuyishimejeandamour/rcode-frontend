import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CommentsService, JerwisService, Message } from 'app/core/services';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  task_id:number;
  contentLoaded = false;
  @Input()
  talks:Message[] = [];
  relys:Message[] = [];
  @Output() toggleSidebar = new EventEmitter<Message>();
  @Input('task')
  set value(v : number) {
    this.task_id = v;
  }
  text:string;

  constructor(
    public message:CommentsService
  ){}

  ngOnInit():void{
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
  }



  openCommentText(comment:Message):void{
    comment.relyOpen = !comment.relyOpen;
  }

  remove(comment:Message):void{
    const index = this.talks.indexOf(comment);
    this.talks = this.talks.splice(index,1);
  }
  viewreplys(data:Message):void{
    this.toggleSidebar.emit(data);
  }

}
