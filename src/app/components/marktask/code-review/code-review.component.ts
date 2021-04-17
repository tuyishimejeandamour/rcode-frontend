import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-review',
  templateUrl: './code-review.component.html',
  styleUrls: ['./code-review.component.scss']
})
export class CodeReviewComponent implements OnInit {

  @HostListener('document:click', ['$event'])
  onClick(targetElement:any):void {

    let heads = document.getElementsByName("accordion_header")
    for (let index = 0; index < heads.length; index++) {
      heads[index].classList.remove("active");
    }
    targetElement.target.classList.;

  }
  constructor() { }

  ngOnInit(): void {

  }


}
