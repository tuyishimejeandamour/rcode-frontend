import { Injectable } from '@angular/core';
export interface Marks {
  id:number;
  name: string;
  marks: string;
}
@Injectable({
  providedIn: 'root'
})
export class MarksService {
  

  constructor() { }
}
