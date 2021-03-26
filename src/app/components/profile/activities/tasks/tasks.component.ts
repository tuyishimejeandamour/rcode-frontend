import { Component, OnInit, HostListener } from '@angular/core';
import { CommonfunctionService } from 'app/Service/commonfunction.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
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
  ],
})
export class TasksComponent implements OnInit{
  sidebar:number = window.innerHeight;
  isOpen = false;
  addOpen = false;

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 1000) ? this.isOpen = true : this.isOpen = false;
  }



  constructor(
    private eventemitterService: CommonfunctionService,
    private router:Router
  ) {

  }


  ngOnInit(): void {
    if(this.sidebar<700){
      if(!this.isOpen)this.isOpen = !this.isOpen;
      if(!this.addOpen)this.addOpen = !this.addOpen;


    }
  }


  firstComponentFunction(value: string): void {
    this.eventemitterService.onFirstComponentButtonClick(value);
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    const link= this.router.url;
    this.addOpen = !this.addOpen;
    if(link=="/profile/activities/newtask"){
      if(this.addOpen){
        this.addOpen = !this.addOpen;
      }
    }
    if(link=="/profile/activities"){
      if(!this.addOpen && this.isOpen){
        this.addOpen = !this.addOpen;
      }
    }
  }
  tabs: any[] = [
    {
      title: 'credetianl',
      active: true,
      iconClass: 'home',
      content: `<strong>HTML(HyperText Markup Language)</strong> is the most basic building block of the Web.
        It describes and defines the content of a webpage along with the basic layout of the webpage.
        Other technologies besides HTML are generally used to describe a web page's
        appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
    },
    {
      title: 'Duration',
      active: false,
      iconClass: 'date_range',
      content: ``
    },
    {
      title: 'issues',
      active: false,
      iconClass: 'priority_high',
      content: `<strong>JavaScript(JS)</strong> is a lightweight interpreted or JIT-compiled programming
        language with first-class functions. While it is most well-known as the scripting
        language for Web pages, many non-browser environments also use it, such as Node.js,
        Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm,
        dynamic language, supporting object-oriented, imperative, and declarative
        (e.g. functional programming) styles.`
    }
  ];



}
