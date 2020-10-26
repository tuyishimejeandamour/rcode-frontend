import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Mail, QuickhelpService } from 'app/Service/quickhelp.service';
import { Chat, ChatService } from 'app/Service/chat.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],

})
export class ProfileInfoComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  constructor(
    public dialog: MatDialog,
    public mailboxService:QuickhelpService,
    private chatService:ChatService
  ) { }

  ngOnInit(): void {
    this.getMails();
    this.chats = this.chatService.getChats(); 
    if(window.innerWidth <= 768){
      this.sidenavOpen = false;
    }    
  }
  isOpen = false;
  public mails: Array<Mail>;
  public mail: Mail;
  public showSearch = false;
  public searchText: string;
  public type="all";
  public userImage = '../../../assets/tuy.png';
  public chats: Array<Chat>;
  public talks: Array<Chat>;
  public sidenavOpen = true;
  public currentChat:Chat;
  public newMessage:string;
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
     
  }
  getChat(obj:Chat):void{
    if(this.talks){
      this.talks.length = 2;
    }   
    this.talks = this.chatService.getTalk();
    this.talks.push(obj);
    this.currentChat = obj;      
    this.talks.forEach(talk => {
      if(!talk.my){
        talk.image = obj.image;
      }
    });
    if(window.innerWidth <= 768){
      this.sidenav.close();
    }     
  }

  sendMessage($event: { which: number; }):void {       
    if (($event.which === 1 || $event.which === 13) && this.newMessage.trim() != '') {
      if(this.talks){ 
        this.talks.push(
          new Chat(
            '../../../assets/tuy.png', 
            'Emilio Verdines', 
            'online', 
            this.newMessage,
            new Date(), 
            true)
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
  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  openNewFolderDialog():void {
    const dialogRef = this.dialog.open(DialogComponent,{
      backdropClass:'searchmembermessage',
      width:'50%',
      maxHeight:'70%',
      position:{top:'10%',left:'35%'}

    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });
  }
}
