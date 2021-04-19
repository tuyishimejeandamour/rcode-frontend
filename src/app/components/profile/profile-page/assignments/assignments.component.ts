
import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssignComponent } from './dialog/dialog.component';
import { QuickhelpService, Mail } from 'app/Service/quickhelp.service';
import { SplitComponent, SplitAreaDirective } from 'angular-split';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentChange } from 'ngx-quill';
import { HttpprofileService } from 'app/core/services/profile/httpprofile.service';
import { MonacoEditorLoaderService } from '@materia-ui/ngx-monaco-editor';
import { filter, take } from 'rxjs/operators';
import { CompilecodeService } from 'app/core/services';

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
      state('collapsed', style({ height: '65.5px', minHeight: '65.5px' })),
      state('expanded', style({ height: '200px' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssignmentsComponent implements OnInit {
  language ='javascript'
  editorOptions = { theme: 'vs-dark', language: this.language };
  editorOptions2 = { theme: 'vs-dark', language: 'javascript'};
  code = 'function x() {\nconsole.log("Hello world!");\n}';
  result: any = null;
  timeStart:any = null;
  languages: any = null;
  sourcecode: any = null;
  codetoexecute ={
    language_id:null,
    source_code:'function x() {\nconsole.log("Hello world!");\n}',
    stdin:null
  }
  constructor(
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    public httpservice: HttpprofileService,
    private monacoLoaderService: MonacoEditorLoaderService,
    private editor:CompilecodeService,
    private mailboxService: QuickhelpService) { }
  isOpen = false;
  public Form = {
    to: null,
    Subject: null,
    message: null
  }
  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  openanswerboard(): void {
    const dialog = this.dialog.open(DialogAssignComponent, {
      width: "80%",
      height: "80%"
    });
    dialog.afterClosed().subscribe(() => {
      if (confirm("send or not")) {
        console.log("confirmed");
      }
    })
  }
  public expand = false;
  public snippet = false;
  public sidenavOpen = true;
  public mails: Array<Mail>;
  public mail: Mail;
  public showSearch = false;
  public searchText: string;
  public type = "all";
  public message: boolean;
  public answer: boolean;
  public compose: boolean;
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
  dragEnd(sizes:Array<any>): void {

    this.sizes.percent.area1 = sizes[0];
    this.sizes.percent.area2 = sizes[1];
  }
  ngOnInit(): void {
    this.getMails();
    this.getlaguages();
    this.message = true;
    this.answer = false;
    this.compose = false;

  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth <= 992) {
      this.sidenavOpen = false;
      this.direction = 'vertical';
    } else {
      this.sidenavOpen = true;
      this.direction = 'horizontal';
    }

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

  public viewDetail(mail: Mail): void {
    this.mail = this.mailboxService.getMail(mail.id);
    this.mails.forEach(m => m.selected = false);
    this.mail.selected = true;
    this.mail.unread = false;
    this.message = true;
    this.answer = false;
    this.compose = false;
  }
  onSubmit(): void {
    if (this.Form.to != null) {
      this.mailboxService.insertMail(
        {
          id: this.mails.length + 1,
          sender: 'you',
          senderPhoto: '../../../assets/tuy.png',
          subject: this.Form.Subject,
          date: 'few seconds ago',
          body: this.Form.message,
          unread: true,
          sent: false,
          starred: false,
          draft: false,
          trash: false,
          selected: false
        }
      )

      this.snackBar.open(`Mail sent to ${<string>this.Form.to}  successfully!`, null, {
        duration: 2000,
        horizontalPosition: 'left'
      });

    }
    this.getMails();

  }
  composeM(): void {
    this.message = false;
    this.compose = true;

  }
  setAsRead(): void {
    this.mail.unread = false;
  }

  setAsUnRead(): void {
    this.mail.unread = true;
  }

  delete(): void {
    this.mail.trash = true;
    this.mail.sent = false;
    this.mail.draft = false;
    this.mail.starred = false;
    this.getMails();
    this.mail = null;
  }

  changeStarStatus(): void {
    this.mail.starred = !this.mail.starred;
    this.getMails();
  }

  restore(): void {
    this.mail.trash = false;
    this.type = 'all';
    this.getMails();
    this.mail = null;
  }
  scrollbottom($event: ContentChange): void {
    if ($event.editor.keyboard.bindings[13]) {
      const chatContainer = $event.editor.scrollingContainer;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }

    }
  }

  compiletherusercode(code: { source_code: string, language_id: any,stdin:string}): void {
    this.timeStart = performance.now();
    this.sourcecode = code;
    this.sourcecode.langauge_id = code.language_id;
    this.sourcecode.code =  this.encode(code.source_code);
    this.sourcecode.stdin = this.encode(code.stdin);
    this.editor.compilecode(this.sourcecode).subscribe(
      data => {this.runtherusercode(data.token);},
      error => console.log(error)
    )
  }
  runtherusercode(token: string): void {
    this.editor.runcode(token).subscribe(
      data => {this.result = data;this.decode(data.compile_output)},
      error=>console.error(error)
    )
  }
  getlaguages(): void {
    this.httpservice.getcodelanguages().subscribe(
      data => this.languages = data
    )
  }
  checkifequal(item:{id:number,name:string}):any{
    if (item.id == this.codetoexecute.language_id){
      return item;
    }
  }
  changelanguage():void{
    this.monacoLoaderService.isMonacoLoaded$.pipe(
      filter(isLoaded => isLoaded),
      take(1),
    ).subscribe(() => {
      monaco.editor.setModelLanguage(monaco.editor.getModels()[0],'javascript')
    });
  }
  encode(str:string):string {
    return btoa(unescape(encodeURIComponent(str || "")));
  }
  decode(bytes:string):string {
    const escaped = escape(atob(decodeURIComponent(bytes || "")));
    try {
      return decodeURIComponent(escaped);
    } catch {
      return unescape(escaped);
    }
  }
  handleResult(data:any):void {
    const timeEnd = performance.now();
    console.log("It took " + <string><unknown>(timeEnd - this.timeStart) + " ms to get submission result.");

    const status = data.status;
    const stdout = this.decode(data.stdout);
    const stderr = this.decode(data.stderr);
    const compile_output = this.decode(data.compile_output);
    const sandbox_message = this.decode(data.message);
    const time = (data.time === null ? "-" : <string>data.time + "s");
    const memory = (data.memory === null ? "-" : <string>data.memory + "KB");

    //$statusLine.html(`${<string><unknown>status.description}, ${time}, ${memory}`);

    // stdoutEditor.setValue(stdout);
    // stderrEditor.setValue(stderr);
    // compileOutputEditor.setValue(compile_output);
    // sandboxMessageEditor.setValue(sandbox_message);

    if (stdout !== "") {
      const dot = document.getElementById("stdout-dot");
      if (!dot.parentElement.classList.contains("lm_active")) {
        dot.hidden = false;
      }
    }
    if (stderr !== "") {
      const dot = document.getElementById("stderr-dot");
      if (!dot.parentElement.classList.contains("lm_active")) {
        dot.hidden = false;
      }
    }
    if (compile_output !== "") {
      const dot = document.getElementById("compile-output-dot");
      if (!dot.parentElement.classList.contains("lm_active")) {
        dot.hidden = false;
      }
    }
    if (sandbox_message !== "") {
      const dot = document.getElementById("sandbox-message-dot");
      if (!dot.parentElement.classList.contains("lm_active")) {
        dot.hidden = false;
      }
    }

  }
}
