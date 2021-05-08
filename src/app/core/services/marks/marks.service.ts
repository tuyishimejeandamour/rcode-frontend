import { Injectable } from '@angular/core';
export interface Marks {
  id:number;
  name: string;
  marks: string;
}
export interface Feedback{
  id?:number;
  feedback:string;
  sender_image:string;
  send_at:Date;
}
@Injectable({
  providedIn: 'root'
})
export class MarksService {


  constructor() { }


}
