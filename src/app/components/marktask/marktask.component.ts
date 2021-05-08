import { CompilecodeService } from './../../core/services/markseditor/compilecode.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';
import { FiletreeService, TreeData } from 'app/Service/filetree.service';
import { MonacoEditorConstructionOptions, MonacoEditorLoaderService, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { filter, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpactivitiesService, HttpexplorerService, HttpmarkeditorService, HttpmarksService, JerwisService } from 'app/core/services';
import { TasksDetails } from '../profile/activities/tasks/tasklist/tasklist.component';
import { MatDialog } from '@angular/material/dialog';
import { GivemarksComponent } from './givemarks/givemarks.component';
import { FilenamePipe } from 'app/core/pipes/filename.pipe';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { SnotifyService } from 'ng-snotify';

export interface Codes{
  code:any;
  path:string
}
@Component({
  selector: 'app-marktask',
  templateUrl: './marktask.component.html',
  styleUrls: ['./marktask.component.scss']
})
export class MarktaskComponent implements OnInit {
  treeData: TreeData[] =  [];
  reserved: TreeData[];
  codes: Codes[] = [];
  showReview = false;
  result:any ={
    outout:null,
    compliedoutput:null,
    message:null,
    error:null
  };
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  students = [{
    id: null,
    firstname: null,
    lastname: null,
    username:null
  }];
  activestudent: TreeData;
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key.toLowerCase() == "alt" &&
       event.key.toLowerCase() == "m")
    {
      this.opendialogy()
    }


  }
  public editor;
  leftSidebarStatus = "c";
  leftSidebarSelected = "";
  leftSidebarSelect = "";
  fileCounter = 1;
  heroId: string;
  pdfdata:any;
  sourcecode:any;
  stdin:string = null;
  urltohtmlfile = "";
  task: TasksDetails = {
    id: null,
    taskname: null,
    lesson: null,
    group_id: null,
    givenat: null,
    endat: null,
  };
  public marks = {
    higscore: null,
    score: null
  }
  public markform = {
    task_id: null,
    teacher_id: this.user.getUser().id,
    student_id: null,
    marks: null
  }

  editorOptions: MonacoEditorConstructionOptions = {
    theme: "vs-dark",
    language: "html",
    minimap: {
      enabled: false
    },
    lineNumbers: "off",
    readOnly: true,
    automaticLayout: true
  };
  constructor(treedata: FiletreeService,
              private monacoLoaderService: MonacoEditorLoaderService,
              private route: ActivatedRoute,
              private user: JerwisService,
              private dialog: MatDialog,
              private http: HttpactivitiesService,
              private httpmark: HttpmarksService,
              private markeditor: HttpmarkeditorService,
              private extension: FilenamePipe,
              private filetree:HttpexplorerService,
              private notify:SnotifyService,
              private compile:CompilecodeService
  ) {

  }
  filterTree(name: string): void {
    this.treeData = this.reserved.filter(data => data.basename == name);
  }
  split: SplitComponent;
  area1: SplitAreaDirective;
  area2: SplitAreaDirective;

  direction = 'horizontal';
  play = false;
  terminal = false;
  sizes = {
    percent: {
      area1: 3.7,
      area2: 96.3,
    },
    percent2: {
      area1: 50,
      area2: 50,
    }
  }
  dragEnd(sizes:Array<any>): void {

    this.sizes.percent.area1 = sizes[0];
    this.sizes.percent.area2 = sizes[1];
  }
  drag2End(sizes:Array<any>): void {
    this.sizes.percent2.area1 = sizes[0];
    this.sizes.percent2.area2 = sizes[1];
  }



  ngOnInit(): void {
    document.getElementById('left-nav-button-1').click();
    document.getElementById('defaultopen').click();
    this.reserved = this.treeData;
    this.heroId = this.route.snapshot.paramMap.get('id');
    this.gettasktomark(<number><unknown>this.heroId);
    this.getstudents(<number><unknown>this.heroId);
    this.filetree.getTreeData1(<number><unknown>this.heroId).subscribe(
      data => {this.treeData = data; this.reserved = data},
      error => console.error(error)
    );
    //this.getlaguages();
  }
  ngAfterViewInit(): void {

  }
  getfileextension(value: string): string {
    const ext = value.split('.').pop();
    const fileclass = "file-ext-" + ext;
    return fileclass;
  }
  initeditor(editor: MonacoStandaloneCodeEditor):void{
    console.log(editor)
  }
  /**
   * sidebar functions
   */
  hideSection(evt: any, section_id: string, icon_id: string): void {
    const selectedElement = document.getElementById(section_id);
    const selectedIcon = document.getElementById(icon_id);
    if (evt.currentTarget.className.toString().split(' ').pop() != "hidden") {
      selectedElement.style.display = "none";
      evt.currentTarget.className += " hidden";
      selectedIcon.style.transform = " rotate(-90deg)";
    } else {
      selectedElement.style.display = "block";
      evt.currentTarget.className = evt.currentTarget.className.replace(" hidden", "");
      selectedIcon.style.transform = "";
    }
  }
  clickLeftNav(evt: any, sidebarName: string): void {
    let i;
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }

    document.getElementById(sidebarName).style.display = "block";

    const tablinks = document.getElementsByClassName("left-nav-button");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
    this.leftSidebarSelected = this.leftSidebarSelect;
    this.leftSidebarSelect = sidebarName;
    if (this.leftSidebarStatus == "c") {
      this.openLeftSideBar();
      this.leftSidebarStatus = "o";
    } else if (this.leftSidebarSelected == this.leftSidebarSelect) {
      this.closeLeftSideBar();
      this.leftSidebarStatus = "c"
      this.leftSidebarSelect = "";
    }
  }

  openLeftSideBar(): void {
    document.getElementById("left-sidebar").style.width = "calc(100% - 50px)";
    const conta = document.getElementsByClassName("container");
    for (let i = 0; i < conta.length; i++) {
      (conta[i] as HTMLElement).style.left = "300px";
    }
    this.sizes.percent.area1 = 20;
    this.sizes.percent.area2 = 80;
  }

  closeLeftSideBar(): void {
    document.getElementById("left-sidebar").style.width = "0";
    const conta = document.getElementsByClassName("container");

    for (let i = 0; i < conta.length; i++) {
      (conta[i] as HTMLElement).style.left = "50px";
    }
    this.sizes.percent.area1 = 3.7;
    this.sizes.percent.area2 = 96.3;
    let tablinks;
    // eslint-disable-next-line prefer-const
    tablinks = document.getElementsByClassName("left-nav-button");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

  }
  /**
   * editor functions
   * @type rcode editor
   */
  filearrays: TreeData[] = [];
  activeindex = -1;
  activelanguage:number = null;
  codetoexecute ={
    language_id:null,
    source_code: null,
    stdin:null
  }
  getiffileopened(data: TreeData): boolean {
    if (this.codes.length > 0) {
      const file = this.codes.filter((code) => code.path == data.path)
      return file.length > 0 ? true : false;
    } else {
      return false;
    }


  }

  setcode(data: TreeData): boolean {

    const num = this.filearrays.indexOf(data, 1)
    if (num < 0) {
      this.filearrays.push(data);
      if(this.play){
        this.play=false;
      }
      this.activelanguage = this.sources[this.fileTypes[this.extension.transform(data.path)]]
      return true;
    } else {
      return false
    }


  }

  addFile(data: TreeData): void {
    if (!this.getiffileopened(data) && data.extension != "pdf" && data.extension != "doc"&& data.extension != "jpg"&& data.extension != "png" && data.extension != "jpeg") {
      if (this.setcode(data)) {
        this.activeindex = this.filearrays.indexOf(data, 1);
        this.activelanguage = this.sources[this.fileTypes[this.extension.transform(data.path)]];
      }
      //console.log("ok this is where i pass")
      const pathname =
      {
        path:data.path,
        code:`loading .......`
      };
      this.codes.push(pathname)
      this.markeditor.getcode(data.path, this.user.getUser().id).subscribe(
        data => {this.changethecode(pathname.path,data.code);this.activelanguage = this.sources[this.fileTypes[this.extension.transform(data.path)]]},
        error => {console.log(error),this.closetab(this.activeindex)}
      );
    } else if (!this.getiffileopened(data) && data.extension == "pdf" || data.extension == "doc") {
      if (this.setcode(data)) {
        this.activeindex = this.filearrays.indexOf(data, 1);

      }
      const pathname =
      {
        path:data.path,
        code:new TextEncoder().encode(`sorry this pdf was not able to load`)
      };
      this.codes.push(pathname)
      this.markeditor.getpdfdata(this.user.getUser().id,data.path).subscribe(
        data =>{ this.changethecode(pathname.path,data);},
        error => console.log(error)
      );
    }else if(!this.getiffileopened(data) && data.extension == "jpg" || data.extension == "png" || data.extension == "jpeg"){
      if (this.setcode(data)) {
        this.activeindex = this.filearrays.indexOf(data, 1);

      }
      const pathname =
      {
        path:data.path,
        code:"https://i.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.webp"
      };
      this.codes.push(pathname);
      this.markeditor.getimagedata(this.user.getUser().id,data.path).subscribe(
        data =>{this.changethecode(pathname.path,data);},
        error => console.log(error)
      );
    }

    if (this.filearrays.length == 1) {
      this.activeindex = 0;
    }
  }
  activatestudent(file:TreeData):void{
    if(file.properties.main){
      this.activestudent = file;
    }

  }
  switchtab(index: number, data: TreeData): void {
    this.monacoLoaderService.isMonacoLoaded$.pipe(
      filter(isLoaded => isLoaded),
      take(1),
    ).subscribe(() => {
      monaco.editor.setModelLanguage(
        monaco.editor.getModels()[index - 1],
        this.fileTypes[this.extension.transform(data.path)]
      );
      this.activelanguage = this.sources[this.fileTypes[this.extension.transform(data.path)]];
    });
  }
  closetab(index: number): void {
    this.filearrays.splice(index, 1);
    if (index == this.activeindex) {
      if (index == 0) {
        this.activeindex = index;
      } else {
        this.activeindex = index - 1;

      }
    } else if (index < this.activeindex) {
      this.activeindex -= 1;

    }
  }
  openCity(evt, cityName: string): void {
    let i: number;
    const tabcontent = Array.from(document.getElementsByClassName("tabcontentM") as HTMLCollectionOf<HTMLElement>);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    const tablinks = Array.from(document.getElementsByClassName("action-label") as HTMLCollectionOf<HTMLElement>)
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

  }

  gettasktomark(id: number): void {
    this.http.getsingletask(id).subscribe(
      (data) => this.task = data,
      error => console.log(error)
    )
  }

  markstudent(result:{user_id:number,marks:number,task_id:number}): void {
    result.task_id = <number><unknown>this.heroId;
    if(result.task_id){
      this.httpmark.givemarks(result).subscribe(
        () => console.log('ok'),
        error => console.log(error)
      )
    }else{
      this.notify.error("task_id not found");
    }
  }
  givefeedback(user_id:number,text:string):void{
    const savefeedback ={
      task_id:this.task.id,
      sender_id:this.user.getUser().id,
      reciever_id:user_id,
      feedback:text
    }
    this.httpmark.setfeedback(savefeedback).subscribe(
      data=> this.notify.success(data.message),
      error=>this.notify.error(error.message)
    )

  }
  getstudents(id: number): void {
    this.httpmark.getyourstudents(id).subscribe(
      (data) => this.students = data,
      error => console.log(error)
    )
  }
  opendialogy(): void {
    if(this.activestudent){
      const dialogRef = this.dialog.open(GivemarksComponent, {
        width: "40%",
        data:{task:this.activestudent,students:this.students}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined){
          //console.log(result);
          this.markstudent(result.mark);
          if(result.text.length>0){
            this.givefeedback(result.mark.user_id,result.text)
          }
        }

      });

    }else{
      this.notify.info("select the student to marks");
    }
  }
  fileTypes= {
    css: 'css',
    js: 'javascript',
    json:'json',
    md: 'markdown',
    mjs: 'javascript',
    ts: 'typescript',
    csv:'csv',
    cpp:'c++',
    c:'c',
    php:'php',
    sql:'sql'
  }
  sources = {
    assembly:45,
    bash:46,
    basic:47,
    c:48,
    'c++':52,
    csharp:51,
    'lisp':55,
    'd':56,
    'elixir':57,
    'erlang':58,
    'executable':44,
    'fortran':59,
    'go':60,
    'haskell':61,
    'java': 62,
    'javaScript':63,
    'lua':64,
    'ocaml':65,
    'octave':66,
    'pascal':67,
    'php':68,
    'plainText':43,
    'prolog':69,
    'python':70,
    'ruby':72,
    'rust':73,
    'typescript':74,
    'cobol':77,
    'kotlin':78,
    'objectivec':79,
    'r':80,
    'scala':81,
    'sqlite':82,
    'swift':83,
    'vb':84,
    'perl':85,
    'clojure':86,
    'fsharp':87,
    'groovy':88,
    'c3':1003,
    'javaTest':1005,
    'mpicc':1006,
    'mpicxx':1007,
    'mpipy':1008,
    'nim':1009,
    'pythonForMl':1010,
    'bosque':1011,
    'cppTest':1012,
    'csharpTest':1023,
  };
  /**
   * pdf staffs
   */
  page = 1;
  totalPages: number;
  isLoaded = false;
  fitpage= true;
  zoom = 1;
  isHtml = true;
  phpoutput = "";
  afterLoadComplete(pdfData: any):void {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage():void {
    this.page++;
  }

  prevPage():void {
    this.page--;
  }
  search(stringToSearch: string):void {
    this.pdfComponent.pdfFindController.executeCommand('find', {
      caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true, query: stringToSearch
    });
  }

  changethecode(path:string,code:string):void{
    this.codes.forEach(element => {
      if (element.path == path) {
        element.code = code;
      }
    });
  }
  /**
   * code to compile the output
   */
  // getlaguages(): void {
  //   this.httpservice.getcodelanguages().subscribe(
  //     data => this.languages = data
  //   )
  // }
  compiletherusercode(): void {
    if(this.extension.transform(this.filearrays[this.activeindex].path) == "html"){
      this.play = true;
      this.isHtml = true;
      this.urltohtmlfile = "";
      return;
    }
    if(this.extension.transform(this.filearrays[this.activeindex].path) == "css"){

      return;
    }
    if(this.activelanguage){
      if(this.codes[this.activeindex].code.trim() ==""){
        this.notify.info("you can't run imput code");
        return;
      }
      this.codetoexecute.language_id = this.activelanguage;
      this.codetoexecute.source_code = this.compile.encode_val(this.codes[this.activeindex].code);
      this.codetoexecute.stdin =  this.compile.encode_val(this.stdin);
      this.notify.info('compiling .....',{
        closeOnClick: true
      });
      this.compile.compilecode(this.codetoexecute).subscribe(
        data => {this.runtherusercode(data.token);this.clearToasts()},
        error =>{this.clearToasts();this.notify.error("error occured  please try again")}
      )
    }else{
      this.notify.info("unable to choose language");
    }
  }
  runtherusercode(token: string): void {
    this.compile.runcode(token).subscribe(
      data => {this.handleResult(data);},
      error=>console.error(error)
    )
  }
  handleResult(data:any):void {
    if(!this.terminal){
      this.terminal = true
    }
    if(data.language.id == 68){
      this.play = true;
      this.isHtml = false;
      this.phpoutput = this.compile.decode(data.stdout);
      return;
    }
    this.result.output = this.compile.decode(data.stdout);
    this.result.error = this.compile.decode(data.stderr);
    this.result.compliedoutput = this.compile.decode(data.compile_output);
    this.result.message = this.compile.decode(data.message);
  }
  clearToasts():void {
    this.notify.clear();
  }

}
