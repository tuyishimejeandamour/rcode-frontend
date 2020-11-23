import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentTaskService, Message } from 'app/Service/student-task.service';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { SnotifyService } from 'ng-snotify';
export interface taskFeedback{
  teachermessage:string;
  studentrely:string;
}
export interface TextContent{
  authorized:boolean;
  taskid:number;
}
export interface taskReview{
  questions:string;
  answers:string;
  feedBack:taskFeedback;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  public talks: Message[];
  newMessage: string;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public message:StudentTaskService,
    public httptask:HttptaskService,
    public notify:SnotifyService,
    @Inject(MAT_DIALOG_DATA) public data:TextContent
  ) {
  }
  taskreviewcontent ={
    long:null,
    short:null
  };

  ngOnInit(): void {
    this.getChat();
    this.gettaskcontent();

  }
  getChat():void{
    if(this.talks){
      this.talks.length = 2;
    }
    this.talks = this.message.getTalk();

  }
  addclassquill():void{
    const editors = document.getElementsByClassName("ql-syntax");
    for(let i=0;i<editors.length;i++){
      editors[i].className += " prettyprint linenums";
    }
  }
  sendMessage($event:any):void {
    if (($event.which === 1 || $event.which === 13) && this.newMessage.trim() != '') {
      if(this.talks){
        this.talks.push(
          {
            image:'../../../assets/tuy.png',
            author:'Emilio Verdines',
            authorStatus:'online',
            text:this.newMessage,
            date:new Date(),
            relys:[],
            relyOpen:false
          }
        )
        this.newMessage = '';
        const chatContainer = document.querySelector('.chat-content');
        if(chatContainer){
          setTimeout(() => {
            const nodes = chatContainer.querySelectorAll('.mat-list-item');
            const newChatTextHeight = nodes[nodes.length- 1];
            chatContainer.scrollTop = chatContainer.scrollHeight + newChatTextHeight.clientHeight;
          });
        }
      }
    }
  }

  ngOnDestroy():void{
    if(this.talks)
      this.talks.length = 2;
  }
  gettaskcontent():void{
    const t = this.data.taskid;
    this.httptask. gettaskcontent(t).subscribe(
      data=> this.HandleResponse(data),
      error=> this.notify.error(error.error.error)
    );


  }
  HandleResponse(data):void{
    this.taskreviewcontent=data;
  }

}
