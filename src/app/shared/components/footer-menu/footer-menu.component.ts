import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class FooterMenuComponent implements OnInit {

  constructor(
    private link: Router
  ) { }

  ngOnInit(): void {
  }
  gohome(value: string): void{
    this.link.navigateByUrl(value)
  }


}
