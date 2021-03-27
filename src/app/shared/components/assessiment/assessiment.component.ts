import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import 'quill-mention';
import 'quill-emoji';
import { Input } from '@angular/core';
import { Groups } from 'app/components/profile/activities/students/students.component';
import { SplitAreaDirective, SplitComponent } from 'angular-split';
@Component({
  selector: 'app-assessiment',
  templateUrl: './assessiment.component.html',
  styleUrls: ['./assessiment.component.scss']
})
export class AssessimentComponent implements OnInit {

  @Input() tabs: any[];
  groups:Groups[] = [];
  @Output() disppear = new EventEmitter<any>();
  public Form ={
    user_id: null,
    taskname:null,
    group_id:null,
    lesson:null,
    short:null,
    long:null,
    givenat:null,
    endat:null,
  }
  firstcontent={
    title:null,
    content:null,

  }
  constructor() { }

  hidetasker():any{
    console.log("good for nothig");
    this.disppear.emit();
  }

  ngOnInit(): void {
  }
  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]

  quillConfig={
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'color': [] }, { 'background': [] }],
        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        [{ 'align': [] }],

        //['clean'],                                         // remove formatting button

        //['link'],
        ['link', 'image', 'video']
      ],

    },

    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        let values;

        if (mentionChar === "@") {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter:{
          key:13,
          handler: (_range, _context):boolean=>{
            console.log("enter");
            return true;
          }
        }
      }
    }
  }
  changeTab(index: number):void {
    this.tabs = this.tabs.map((tab, i) => i === index ? { ...tab, active: true } : { ...tab, active: false });
  }
  viewhelp(id:number):void{
    if(id==1){
      this.firstcontent={
        title:'task name',
        content:'write briefly what name of you task'
      }
    }else if(id==2){
      this.firstcontent={
        title:'select class or classes',
        content:'select classname or many class or select all option to give to all class'
      }
    }else if(id==3){
      this.firstcontent={
        title:'select lesson',
        content:'select lesson if you give many lesson for futher classification of task'
      }
    }
    else if(id==4){
      this.firstcontent={
        title:'short discription',
        content:'enter summary of what you task is about'
      }
    }
  }
  split: SplitComponent;
  area1: SplitAreaDirective;
  area2: SplitAreaDirective;

  direction = 'horizontal';

  sizes = {
    percent: {
      area1: 75,
      area2: 25,
    }
  }
  dragEnd(sizes:Array<any>): void {

    this.sizes.percent.area1 = sizes[0];
    this.sizes.percent.area2 = sizes[1];
  }
}
