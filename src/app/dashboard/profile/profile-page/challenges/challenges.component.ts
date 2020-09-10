import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
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
export class ChallengesComponent implements OnInit {
  public open = false;
  constructor() { }
  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
  }
  show(b:string): void {
    this.get(b).style.display="block"

  }
  hide(b:string): void{
    this.get(b).style.display = "none";

  }
  get (a:string):HTMLElement {
    return  document.getElementById(a);
  }

  openNav(): void {
    this.open = !this.open;
    this.get("assignment_div").style.marginLeft="10px";
  }
}
