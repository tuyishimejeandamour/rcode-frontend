import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'app/Service/student-task.service';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  @Input()
  talks:Message[] = [];
  text:string;

  constructor(){}

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

          image:'../../../assets/tuy.png',
          author:'Emilio Verdines',
          authorStatus:'online',
          text:this.text,
          date:new Date(),
          relys:[],
          relyOpen:false,

        });
    }
  }

  openCommentText(comment:Message):void{
    comment.relyOpen = !comment.relyOpen;
  }

  remove(comment:Message):void{
    const index = this.talks.indexOf(comment);
    this.talks = this.talks.splice(index,1);
  }

}
