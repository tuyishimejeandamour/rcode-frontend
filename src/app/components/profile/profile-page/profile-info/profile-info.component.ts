import { Component, OnInit, HostListener, ViewChild, Inject, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mail, QuickhelpService } from 'app/Service/quickhelp.service';
import { Chat, ChatService } from 'app/Service/chat.service';
import * as Highcharts from 'highcharts';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { JerwisService, User } from 'app/core/services';
import { UploadfileService } from 'app/core/services/fileexplorer/uploadfile.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'block',
        height: 'calc(100% - 40px)',
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('open <=> closed', [
        animate('1000ms ease-in')
      ]),

    ]),

  ],



})
export class ProfileInfoComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  currentuser: User;
  public profileinfo = {
    filepath: '../.././../../../assets/profile_picture/41594424503.png',
    bio: 'add bio'
  }
  constructor(
    public dialog: MatDialog,
    public mailboxService: QuickhelpService,
    private chatService: ChatService,
    private user: JerwisService,
    private uploadService: UploadfileService,
    private _ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.currentuser = this.user.getUser();
    this.geitprogileinfo();
    this.getMails();
    this.chats = this.chatService.getChats();
    if (window.innerWidth <= 768) {
      this.sidenavOpen = false;
    }
  }
  isOpen = false;
  edit = false;
  editinput = true;
  isviewOpen = false;
  public mails: Array<Mail>;
  public mail: Mail;
  public showSearch = false;
  public searchText: string;
  public type = "all";
  public userImage = '../../../assets/tuy.png';
  public chats: Array<Chat>;
  public talks: Array<Chat>;
  public sidenavOpen = true;
  public currentChat: Chat;
  public newMessage: string;
  public bio = {
    bio: 'click to add bio'
  }

  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 1, color: 'white' },
    { text: 'Two', cols: 2, rows: 2, color: 'white' },
    { text: 'Three', cols: 1, rows: 1, color: 'white' },
    { text: 'Four', cols: 1, rows: 1, color: 'white' },
  ];
  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth <= 992) ? this.isOpen = true : this.isOpen = false;
  }
  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  public getMails(): void {
    switch (this.type) {
      case 'all':
        this.mails = this.mailboxService.getAllMails();
        break;
      case 'starred':
        this.mails = this.mailboxService.getStarredMails();
        break;
      case 'sent':
        this.mails = this.mailboxService.getSentMails();
        break;
      case 'drafts':
        this.mails = this.mailboxService.getDraftMails();
        break;
      case 'trash':
        this.mails = this.mailboxService.getTrashMails();
        break;
      default:
        this.mails = this.mailboxService.getDraftMails();
    }
  }
  clicktoupload(): void {
    const ele = document.getElementById('fileinput');
    ele.click();
  }
  change(end: any): void {
    const dialogRefs = this.dialog.open(UploadimageComponent, {
      maxHeight: '70%',
      data: end

    });
    dialogRefs.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });
  }

  public viewDetail(mail: Mail): void {
    this.mail = this.mailboxService.getMail(mail.id);
    this.mails.forEach(m => m.selected = false);
    this.mail.selected = true;
    this.mail.unread = false;

  }
  getChat(obj: Chat): void {
    if (this.talks) {
      this.talks.length = 2;
    }
    this.talks = this.chatService.getTalk();
    this.talks.push(obj);
    this.currentChat = obj;
    this.talks.forEach(talk => {
      if (!talk.my) {
        talk.image = obj.image;
      }
    });
    if (window.innerWidth <= 768) {
      this.sidenav.close();
    }
  }

  sendMessage($event: { which: number; }): void {
    if (($event.which === 1 || $event.which === 13) && this.newMessage.trim() != '') {
      if (this.talks) {
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
        if (chatContainer) {
          setTimeout(() => {
            const nodes = chatContainer.querySelectorAll('.mat-list-item');
            const newChatTextHeight = nodes[nodes.length - 1];
            chatContainer.scrollTop = chatContainer.scrollHeight + newChatTextHeight.clientHeight;
          });
        }
      }
    }
  }
  toggle(): void {
    this.isOpen = !this.isOpen;
  }


  // openNewFolderDialog(): void {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     backdropClass: 'searchmembermessage',
  //     width: '50%',
  //     maxHeight: '70%',
  //     position: { top: '10%', left: '35%' }

  //   });
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (res) {
  //       console.log(res)
  //     }
  //   });
  // }
  geitprogileinfo(): void {
    this.uploadService.profileimage(this.user.getUser().id).subscribe(
      data => { this.profileinfo = data; this.bio.bio = data.bio },
      (error) => { }
    )
  }
  updatebio(): void {
    this.uploadService.updatebio(this.user.getUser().id, this.bio).subscribe(
      data => this.bio = data,
      error => console.log(error)
    )
  }
  /**
    * charts
    */
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'areaspline'
    },
    title: {
      text: 'Performance'
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 150,
      y: 100,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
      categories: [
        'Mon',
        'Tue',
        'Wed',
        'Thur',
        'Fri',
        'Sat',
        'Sun'
      ],
      plotBands: [{ // visualize the weekend
        from: 4.5,
        to: 6.5,
        color: 'rgba(68, 170, 213, .2)'
      }]
    },
    yAxis: {
      title: {
        text: 'marks%'
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: ' units'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    series: [{
      name: 'java',
      type: 'areaspline',
      data: [3, 4, 3, 5, 4, 10, 12]
    }
    ,
    {
      name: 'c++',
      type: 'areaspline',
      data: [1, 3, 4, 3, 3, 5, 4]
    }]
  };
}
@Component({
  selector: 'uploadimage',
  templateUrl: 'uploadimage.html',
})

export class UploadimageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UploadimageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private User: JerwisService,
    private uploadService: UploadfileService
  ) { }
  imgURL: any;
  selectedFile: any;
  ngOnInit(): void {
    this.uploadimage(this.data)
  }
  uploadimage(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }
  onupload(): void {
    this.onNoClick();
    this.uploadService.upload(this.selectedFile, this.User.getUser().id).subscribe(
      (res) => console.log(res),
      (err) => (err)
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
