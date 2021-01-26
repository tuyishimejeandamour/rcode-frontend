import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { SnotifyService } from 'ng-snotify';
import { HttpmarksService, JerwisService} from 'app/core/services';
import { Feedback } from 'app/core/services/marks/marks.service';
import 'quill-emoji/dist/quill-emoji.js'
import * as QuillNamespace from 'quill';
const Quill = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);
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
  public talks: Feedback[];
  newMessage: string;
  modules:any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public feedback:HttpmarksService,
    public httptask:HttptaskService,
    public user:JerwisService,
    public notify:SnotifyService,
    @Inject(MAT_DIALOG_DATA) public data:{authorized:boolean,taskid:number,user:number}
  ) {
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],
        ['code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['image', 'video'],
        ['emoji'],

      ],
      imageResize: true
    }
  }

  taskreviewcontent ={
    long:null,
    short:null
  };

  ngOnInit(): void {
    this.getFeedback();
    this.gettaskcontent();

  }
  getFeedback():void{
    const feed ={
      task_id:this.data.taskid,
      sender_id:this.user.getUser().id,
      reciever_id:this.data.user
    }
    this.feedback.getfeedback(feed).subscribe(
      data => this.talks = data
    )

  }
  addclassquill():void{
    const editors = document.getElementsByClassName("ql-syntax");
    for(let i=0;i<editors.length;i++){
      editors[i].className += " prettyprint linenums";
    }
  }
  sendMessage():void {
    const respond =
          {
            task_id: this.data.taskid,
            sender_id: this.user.getUser().id,
            reciever_id: this.data.user,
            feedback: this.newMessage
          }
    this.feedback.setfeedback(respond).subscribe(
      () => this.getFeedback(),
      error => this.notify.error(error)
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
  addBindingCreated(quill):void {
    quill.keyboard.addBinding({
      key: 'g',
      ctrlKey: true
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING B', range, context)
    })

    quill.keyboard.addBinding({
      key: 13,
      ctrlKey: true
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      alert('ok');
      console.log('KEYBINDING SHIFT + B', range, context)
    })
  }

}
