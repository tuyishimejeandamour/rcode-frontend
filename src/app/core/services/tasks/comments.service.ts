import { Injectable } from '@angular/core';
export interface Message {
  image: string;
  author: string;
  authorStatus: string;
  text: string;
  date: Date;
  relys: Message[];
  relyOpen:boolean;
}
const date = new Date(),
  day = date.getDate(),
  month = date.getMonth(),
  year = date.getFullYear(),
  hour = date.getHours(),
  minute = date.getMinutes();
const talks:Message[] = [
  {
    image:'../../../assets/tuy.png',
    author:'Ashley Ahlberg',
    authorStatus:'Online',
    text:'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Annular Admin Template?',
    date:new Date(year, month, day-2, hour, minute+3),
    relys:[],
    relyOpen:false
  },
  {
    image:'../../../assets/tuy.png',
    author:'Emilio Verdines',
    authorStatus:'Online',
    text:'Hi, Annular is a fully compatible with angular material 2, responsive, organized folder structure, clean & customizable code, easy to use and much more...',
    date:new Date(year, month, day-2, hour, minute+2),
    relys:[],
    relyOpen:false

  }
]

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }
  getTalk():Message[] {
    return talks;
  }

}

