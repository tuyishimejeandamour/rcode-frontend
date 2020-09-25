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
  
 
  

}
