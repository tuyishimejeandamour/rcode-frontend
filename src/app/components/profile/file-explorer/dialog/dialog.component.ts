import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsService, Message } from 'app/core/services';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { SnotifyService } from 'ng-snotify';
import { TextContent } from '../../marks-page/dialog/dialog.component';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public talks: Message[];
  newMessage: string;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public message:CommentsService ,
    public httptask:HttptaskService,
    public notify:SnotifyService,
    @Inject(MAT_DIALOG_DATA) public data:TextContent
  ) {}
  taskreviewcontent=
  {
    questions:`
      <div quill-editor-element="" class="ql-container ql-snow" style="height: 88%;"><div class="ql-editor" data-gramm="false" contenteditable="true" data-placeholder="Insert text here ..."><p>Q 1&nbsp;- What is the output of the following program?</p><pre class="ql-syntax" spellcheck="false">#include&lt;iostream&gt;

    using namespace std;
    class abc {
       public:
          static int x;
          int i;

          abc() {
             i = ++x;
          }
       };
    int abc::x;

    main() {
       abc m, n, p;

       cout&lt;&lt;m.x&lt;&lt;" "&lt;&lt;m.i&lt;&lt;endl;
    }
    </pre><p>A&nbsp;- 3 1</p><p>B&nbsp;- 3 3</p><p>C&nbsp;- 1 1</p><p>D&nbsp;- 1 3</p><h3>Answer : A</h3><h3>Explaination</h3><p>The static member variable ‘x’ shares common memory among all the objects created for the class.</p><pre class="ql-syntax" spellcheck="false">#include&lt;iostream&gt;

    using namespace std;
    class abc {
       public:
          static int x;
          int i;

          abc() {
             i = ++x;
          }
       };
    int abc::x;

    main() {
       abc m, n, p;

       cout&lt;&lt;m.x&lt;&lt;" "&lt;&lt;m.i&lt;&lt;endl;
    }
    </pre><p>Show Answer</p><p>Q 2&nbsp;- By default the members of the structure are</p><p>A&nbsp;- private</p><p>B&nbsp;- protected</p><p>C&nbsp;- public</p><p>D&nbsp;- Access specifiers not applicable for structures.</p><h3>Answer : C</h3><h3>Explaination</h3><p>If no access specifiers are specified for structure variables/functions, then the default is considered as public.</p><p>Show Answer</p><p>Q 3&nbsp;- We can have varying number of arguments for the overloaded form of () operator.</p><p>A&nbsp;- True</p><p>B&nbsp;- False</p><h3>Answer : A</h3><h3>Explaination</h3><p>Show Answer</p><p>Q 4&nbsp;- Designer of C++ programming language.</p><p>A&nbsp;- Charles Babbage</p><p>B&nbsp;- Dennis Ritchie</p><p>C&nbsp;- Brain Kernighan</p><p>D&nbsp;- Bjarne Stroustrup</p><h3>Answer : D</h3><h3>Explaination</h3><p>Show Answer</p><p>Q 5&nbsp;- What is the output of the following program?</p><pre class="ql-syntax" spellcheck="false">#include&lt;iostream&gt;

    using namespace std;
    main() {
       int *p = new int;
       delete p;
       delete p;
       cout&lt;&lt;"Done";
    }
    </pre><p>A&nbsp;- Done</p><p>B&nbsp;- Compile error</p><p>C&nbsp;- Runtime error</p><p>D&nbsp;- None of the above</p><h3>Answer : C</h3><h3>Explaination</h3><p>It is invalid to release memory more than once.</p><pre class="ql-syntax" spellcheck="false">#include&lt;iostream&gt;

    using namespace std;
    main() {
       int *p = new int;
       delete p;
       delete p;
       cout&lt;&lt;"Done";
    }
    </pre><p>Show Answer</p><p>Q 6&nbsp;- (i) ‘ios’ is the base class of ‘istream’</p><p>(ii) All the files are classified into only 2 types. (1) Text Files (2) Binary Files.</p><p>A&nbsp;- Only (i) is true</p><p>B&nbsp;- Only (ii) is true</p><p>C&nbsp;- Both (i) &amp; (ii) are true</p><p>D&nbsp;- Both (i) &amp; (ii) are false</p><h3>Answer : C</h3><h3>Explaination</h3><p>Show Answer</p><p>Q 7&nbsp;- What is the output of the following program?</p><pre class="ql-syntax" spellcheck="false">#include&lt;iostream&gt;

    using namespace std;
    main() {
       const int a = 5;

       a++;
       cout&lt;&lt;a;
    }
    </pre><p>A&nbsp;- 5</p><p>B&nbsp;- 6</p><p>C&nbsp;- Runtime error</p><p>D&nbsp;- Compile error</p><h3>Answer : D</h3><h3>Explaination</h3><p>Compile error - constant variable cannot be modified.</p><pre class="ql-syntax" spellcheck="false">#include&lt;iostream&gt;

    using namespace std;
    main() {
       const int a = 5;

       a++;
       cout&lt;&lt;a;
    }
    </pre><p>Show Answer</p><p>Q 8&nbsp;- What is the size of ‘int’?</p><p>A&nbsp;- 2</p><p>B&nbsp;- 4</p><p>C&nbsp;- 8</p><p>D&nbsp;- Compiler dependent</p><h3>Answer : D</h3><h3>Explaination</h3><p>The size of ‘int’ depends upon the complier i.e. whether it is a 16 bit or 32 bit.</p><p>Show Answer</p><p>Q 9&nbsp;- Identify the C++ compiler of Linux</p><p>A&nbsp;- cpp</p><p>B&nbsp;- g++</p><p>C&nbsp;- Borland</p><p>D&nbsp;- vc++</p><h3>Answer : B</h3><h3>Explaination</h3><p>g++ is GNU C++ compiler for linux. Borland and vc++ (Microsoft visual c++) for windows.</p><p>Show Answer</p><p>Q 10&nbsp;- What is the built in library function to compare two strings?</p><p>A&nbsp;- string_cmp()</p><p>B&nbsp;- strcmp()</p><p>C&nbsp;- equals()</p><p>D&nbsp;- str_compare()</p><h3>Answer : B</h3><h3>Explaination</h3><p>strcmp() is the built in function from “string.h” to compare two strings. Returns 0 if both are same strings. Returns -1 if first &lt; second string. Returns 1 first &gt; second.</p><p>Show Answer</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div><div class="ql-tooltip ql-hidden"><a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a></div></div>
      `,
    answers:'no answer yet',
    feedBack:[
      {

        teachermessage:'keep trying all message',
        studentrely:'string'

      }
    ]

  }

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
            relyOpen:false,
          }
        )
        this.newMessage = '';

      }
    }
  }

  ngOnDestroy():void{
    if(this.talks)
      this.talks.length = 2;
  }
  gettaskcontent():void{
    const t = this.data.taskid;
    alert(this.data.taskid)
    this.httptask. gettaskcontent(t).subscribe(
      data=> this.HandleResponse(data),
      error=> this.notify.error(error.error.error)
    );

  }
  HandleResponse(data):void{
    this.taskreviewcontent=data;
  }

}


