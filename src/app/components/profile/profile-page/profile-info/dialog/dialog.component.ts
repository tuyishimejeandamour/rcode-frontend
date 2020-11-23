import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  url= "https://unsplash.com/photos/Bcdd_KstUHo/download?force=true&w=640";
  constructor() { }

  ngOnInit(): void {
  }


}
