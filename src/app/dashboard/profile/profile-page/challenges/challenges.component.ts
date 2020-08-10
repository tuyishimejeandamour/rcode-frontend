import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  public open = false;
  constructor() { }

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
