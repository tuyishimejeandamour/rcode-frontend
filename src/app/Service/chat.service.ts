import { Injectable } from '@angular/core';
export class Chat {
  constructor(public image: string,
              public author: string,
              public authorStatus: string,
              public text: string,
              public date: Date,
              public my: boolean) { }
} 
const date = new Date(),
  day = date.getDate(),
  month = date.getMonth(),
  year = date.getFullYear(),
  hour = date.getHours(),
  minute = date.getMinutes();

const chats = [
  new Chat(
    '../../../assets/tuy.png',
    'Ashley Ahlberg', 
    'Online',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day-2, hour, minute),
    false
  ),
  new Chat(
    '../../../assets/tuy.png',
    'Bruno Vespa',
    'Do not disturb',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day-2, hour, minute),
    false
  ),
  new Chat(
    '../../../assets/tuy.png',
    'Julia Aniston',
    'Away',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day-2, hour, minute),
    false
  ),
  new Chat(
    '../../../assets/tuy.png',
    'Adam Sandler',
    'Online',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day-2, hour, minute),
    false
  ),
  new Chat(
    '../../../assets/tuy.png',
    'Tereza Stiles',
    'Offline',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day-2, hour, minute),
    false
  ),  
  new Chat(
    '../../../assets/tuy.png',
    'Michael Blair',
    'Online',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day-2, hour, minute),
    false
  )
]

const talks = [
  new Chat(
    '../../../assets/tuy.png',
    'Ashley Ahlberg', 
    'Online',
    'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Annular Admin Template?',
    new Date(year, month, day-2, hour, minute+3),
    false
  ),
  new Chat(
    '../../../assets/tuy.png',
    'Emilio Verdines', 
    'Online',
    'Hi, Annular is a fully compatible with angular material 2, responsive, organized folder structure, clean & customizable code, easy to use and much more...',
    new Date(year, month, day-2, hour, minute+2),
    true
  )
]
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  getChats():Array<Chat> {
    return chats;
  }

  getTalk():Array<Chat> {
    return talks;
  }
}
