import { Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { SnotifyService } from 'ng-snotify';
import { CommentsService,ElectronService,JerwisService,Message } from 'app/core/services';
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
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.scss']
})
export class DiscussComponent implements OnInit,AfterViewInit{
  public talks: Message[];
  public Replys:Message[] = [];
  public issue:Message = null;
  newMessage: string;
  modules:any;
  image:string;
  sideopened = false;
  replyissue = null;
  constructor(
    public dialogRef: MatDialogRef<DiscussComponent>,
    public message:CommentsService,
    private electron: ElectronService,
    public httptask:HttptaskService,
    public user:JerwisService,
    public notify:SnotifyService,
    @Inject(MAT_DIALOG_DATA) public data:TextContent
  ) {
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'underline', 'strike'],
        ['code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],


      ],
      imageResize: true
    }
  }
  taskreviewcontent ={
    long:null,
    short:null
  };

  ngOnInit(): void {
    this.getissues(this.data.taskid);
    this.gettaskcontent();
    this.image = this.user.getUser().profileImage;
    this.electron.ipcRenderer.on('wrote-pdf', (event, path) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const message = `Wrote pdf to : ${path}`;
      console.log(message);
    })
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.addclassquill()
  }
  getissues(id:number):void{
    if(this.talks){
      this.talks.length = 2;
    }
    this.message.gettaskissues(id).subscribe(
      data=> {
        this.talks = []
        for (let index = 0; index < data.length; index++) {
          if (data[index].issue_id == null) {
            this.talks.push(data[index]);
          }
        }
        for (let index = 0; index < this.talks.length; index++) {
          for (let j = 0; j < data.length; j++) {
            if (data[j].issue_id == this.talks[index].id) {
              this.talks[index].relys.push(data[j])
            }
          }

        }

      }
    );

  }

  addclassquill():void{
    const editors = document.getElementsByClassName("ql-syntax");
    for(let i=0;i<editors.length;i++){
      editors[i].className += " prettyprint linenums";
    }
  }
  sendMessage():void {
    // if (($event.which === 1 || $event.which === 13) && this.newMessage.trim() != '') {
    if(this.talks){
      this.talks.push(
        {
          image: this.user.getUser().profileImage,
          issue_id:null,
          author:this.user.getUser().firstname+" "+this.user.getUser().lastname,
          authorStatus:'online',
          text:this.newMessage,
          date:new Date(),
          relys:[],
          relyOpen:false
        }
      )

      const chatContainer = document.querySelector('.chat-content');
      if(chatContainer){
        setTimeout(() => {
          const nodes = chatContainer.querySelectorAll('.mat-list-item');
          const newChatTextHeight = nodes[nodes.length- 1];
          chatContainer.scrollTop = chatContainer.scrollHeight + newChatTextHeight.clientHeight;
        });
      }
    }
    setTimeout(() => {
      const comment={
        task_id:this.data.taskid,
        issue_id: null,
        user_id:this.user.getUser().id,
        comment:this.newMessage
      }
      this.newMessage = '';
      console.log(comment)
      this.message.reporttaskissues(comment).subscribe(
        data=> this.getissues(this.data.taskid),
        error=>this.notify.error(error)
      )
    }, 300);


  }
  sendReply():void{
    this.addAnwser();
    this.replyissue="";
  }
  addAnwser():void{
    if(this.replyissue){
      this.Replys.push(
        {
          issue_id:this.issue.id,
          image:this.user.getUser().profileImage,
          author:this.user.getUser().firstname+" "+this.user.getUser().lastname,
          authorStatus:'online',
          text:this.replyissue,
          date:new Date(),
          relys:[],
          relyOpen:false,
        });
      console.error(this.issue.id);
      const comment={
        task_id:this.data.taskid,
        issue_id: this.issue.id,
        user_id:this.user.getUser().id,
        comment:this.replyissue
      }
      // newComment.relyOpen = false;
      this.message.reporttaskissues(comment).subscribe(
        data=> console.log(data),
        error=>this.notify.error(error)
      )

    }

  }
  ngOnDestroy():void{

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
  openreply(data:Message):void{
    this.Replys = data.relys;
    this.issue = data;
    this.sideopened = true;
  }

  printpdf():void{
    const content = this.taskreviewcontent.long;
    this.electron.ipcRenderer.send('printPDF',content);
  }
}

