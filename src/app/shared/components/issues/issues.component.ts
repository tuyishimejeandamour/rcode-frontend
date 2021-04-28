import { Component, OnInit, Input} from '@angular/core';
import { CommentsService, JerwisService, Message } from 'app/core/services';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  task_id:number;
  @Input()
  talks:Message[] = [];
  relys:Message[] = [];
  @Input('task')
  set value(v : number) {
    this.task_id = v;
  }
  text:string;

  constructor(
    private user:JerwisService,
    public message:CommentsService,

    private notify:SnotifyService
  ){}

  ngOnInit():void{

  }

  addComment(comment:Message):void{
    this.addAnwser(comment);
    comment.relyOpen = false;
    this.text="";
  }
  addAnwser(newComment:Message):void{
    if(this.text){
      newComment.relys.push(
        {
          issue_id:newComment.id,
          image:'../../../assets/tuy.png',
          author:'Emilio Verdines',
          authorStatus:'online',
          text:this.text,
          date:new Date(),
          relys:[],
          relyOpen:false,
        });
      const comment={
        task_id:this.task_id,
        issue_id: newComment.id,
        user_id:this.user.getUser().id,
        comment:this.text
      }
      newComment.relyOpen = false;
      this.message.reporttaskissues(comment).subscribe(
        data=> console.log(data),
        error=>this.notify.error(error)
      )

    }

  }

  openCommentText(comment:Message):void{
    comment.relyOpen = !comment.relyOpen;
  }

  remove(comment:Message):void{
    const index = this.talks.indexOf(comment);
    this.talks = this.talks.splice(index,1);
  }
  viewreplys(data:Message[]):void{
    this.relys = data;
  }

}
