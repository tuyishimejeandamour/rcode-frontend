import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
export interface TaskYouHave{
  class: string;
  created_at: Date;
  endat: Date;
  givenat: Date;
  lesson: string;
  long:string;
  short: string;
  task_id: number;
  taskname: string;
  updated_at: Date;
  user_id: number
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
  private contracts:TaskYouHave[];
  private nLiveContracts: number;
  constructor() {  }

  public countdown(contracts: TaskYouHave[]): Observable<TaskYouHave[]> {
    this.contracts = contracts;
    return timer(0, 1000)
      .pipe(
        map(this.setRemainingTime),
        takeWhile(() => this.nLiveContracts > 0, true)
      );
  }

  private setRemainingTime = (): TaskYouHave[] => {
    this.nLiveContracts = 0;
    this.contracts.forEach(contract => {
      console.log(contract.endat);
      contract.givenat = new Date(this.calculateRemainingTime(new Date(contract.endat)));
      if (contract.givenat) {
        this.nLiveContracts++;
      }

    });
    return this.contracts;
  }


  /**
   * Returns null if there is no remaining time
   */
  calculateRemainingTime(date: Date): string {
    const now = new Date();
    console.log(date);
    const remainingTime = Math.floor((date.getTime() - now.getTime()) / 1000);
    console.log(remainingTime);
    if (remainingTime <= 0) {
      return null;
    } else {
      const hours = Math.floor(remainingTime / 3600);
      const remainingTimes = remainingTime % 3600;
      const minutes = Math.floor(remainingTimes / 60);
      const seconds = remainingTimes % 60;
      console.log(`${this.leadingZero(hours)}:${this.leadingZero(minutes)}:${this.leadingZero(seconds)}`);
      return `${this.leadingZero(hours)}:${this.leadingZero(minutes)}:${this.leadingZero(seconds)}`;
    }
  }

  leadingZero(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }


}
