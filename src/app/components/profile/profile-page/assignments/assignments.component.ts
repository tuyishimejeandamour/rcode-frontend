import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssignComponent } from './dialog/dialog.component';
import { QuickhelpService, Mail } from 'app/Service/quickhelp.service';
import { SplitComponent, SplitAreaDirective } from 'angular-split';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentChange } from 'ngx-quill';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
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
    trigger('expandmessage', [
      state('collapsed', style({height: '65.5px', minHeight: '65.5px'})),
      state('expanded', style({height: '200px'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssignmentsComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = 'function x() {\nconsole.log("Hello world!");\n}';
  constructor(
    private dialog:MatDialog,
    public snackBar: MatSnackBar,
    private mailboxService:QuickhelpService) { }
  isOpen = false;
  public Form = {
    to: null,
    Subject: null,    
    message: null
  }
  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  openanswerboard():void{
    const dialog = this.dialog.open(DialogAssignComponent,{
      width:"80%",
      height:"80%"
    });
    dialog.afterClosed().subscribe(()=>{
      if(confirm("send or not")){
        console.log("confirmed");
      }
    })
  }
  public expand=false;
  public snippet=false;
  public sidenavOpen = true;
  public mails: Array<Mail>;
  public mail: Mail;
  public showSearch = false;
  public searchText: string;
  public type="all";
  public message:boolean;
  public answer:boolean;
  public compose:boolean;
  split: SplitComponent;
  area1: SplitAreaDirective;
  area2: SplitAreaDirective;  
  direction = 'horizontal'
  sizes = {
    percent: {
      area1: 70,
      area2: 30,
    }
  } 
  dragEnd({sizes}):void {
    
    this.sizes.percent.area1 = sizes[0];
    this.sizes.percent.area2 = sizes[1]; 
  }
  ngOnInit():void {
    this.getMails();
    this.message= true;
    this.answer=false;
    this.compose=false;      
    
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 992) ? this.isOpen = true : this.isOpen = false;
  }

  public getMails():void{
    switch (this.type) {
      case 'all': 
        this.mails = this.mailboxService.getAllMails();
        break;
      case 'starred':
        this.mails =  this.mailboxService.getStarredMails();
        break;
      case 'sent':
        this.mails =  this.mailboxService.getSentMails();
        break;
      case 'drafts':
        this.mails =  this.mailboxService.getDraftMails();
        break;
      case 'trash':
        this.mails =  this.mailboxService.getTrashMails();
        break;
      default:
        this.mails =  this.mailboxService.getDraftMails();
    }  
  }

  public viewDetail(mail:Mail):void{
    this.mail = this.mailboxService.getMail(mail.id);    
    this.mails.forEach(m => m.selected = false);
    this.mail.selected = true;
    this.mail.unread = false;
    this.message= true;
    this.answer=false;
    this.compose=false;     
  }
  onSubmit():void{
    if(this.Form.to !=null){
      this.mailboxService.insertMail(
        {
          id:this.mails.length+1,   
          sender:'you', 
          senderPhoto:'../../../assets/tuy.png',
          subject:this.Form.Subject,
          date: 'few seconds ago',
          body:this.Form.message, 
          unread:true,
          sent:false,
          starred:false,
          draft:false,
          trash:false,
          selected:false 
        }
      )

      this.snackBar.open(`Mail sent to ${<string>this.Form.to}  successfully!`, null, {
        duration: 2000,
        horizontalPosition:'left'
      });
      
    }
    this.getMails();
    
  }
  composeM():void{
    this.message = false;
    this.compose = true;
    
  }
  scrollbottom($event:ContentChange):void{
    if ($event.editor.keyboard.bindings[13]) {
      const chatContainer = $event.editor.scrollingContainer;
      if(chatContainer){
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }

    }


  }
}
