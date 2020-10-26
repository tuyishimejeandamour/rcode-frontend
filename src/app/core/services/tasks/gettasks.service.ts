import { Injectable } from '@angular/core';
export interface TaskYouHave{
  taskid:number;
  taskname:string;
  lesson:string;
  remainingdate:string;
  submittiondate:Date;
}
export interface Submittedfiles{
  name:string;
  path:string;
  subfiles?:Submittedfiles[]
}
export interface SubmittedTask{
  taskid:number;
  taskname:string;
  giveat:Date;
  marks:string;
  submitted:Date;
  files?:Submittedfiles[]
}
@Injectable({
  providedIn: 'root'
})
export class GettasksService {
  constructor() {

    
  }

  
}
