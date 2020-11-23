import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilepicture',
  templateUrl: './profilepicture.component.html',
  styleUrls: ['./profilepicture.component.scss']
})
export class ProfilepictureComponent implements OnInit {

  @Input() imgUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
