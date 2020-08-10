
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class CommonfunctionService {

  invokeFirstComponentFunction = new EventEmitter();
  invokegettaskfunction = new EventEmitter();
  subsVar: Subscription;
  subsVar2: Subscription;

  constructor() { }

  onFirstComponentButtonClick(value: string):void {
    this.invokeFirstComponentFunction.emit(value);
  }
  onsubmittask():void {
    this.invokegettaskfunction.emit();
  }
}

