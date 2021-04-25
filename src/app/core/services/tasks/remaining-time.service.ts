
import { TaskYouHave } from 'app/core/services';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemainingTimeService {
  private contracts: TaskYouHave[];
  private nLiveContracts: number;
  constructor() { }

  public countdown(contracts:TaskYouHave[]): Observable<TaskYouHave[]> {
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
      contract.updated_at = this.calculateRemainingTime(new Date(contract.endat));
      if (contract.endat) {
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
    let remainingTime = Math.floor((date.getTime() - now.getTime()) / 1000);
    if (remainingTime <= 0) {
      return null;
    } else {
      const hours = Math.floor(remainingTime / 3600);
      remainingTime = remainingTime % 3600;
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      return `${this.leadingZero(hours)}:${this.leadingZero(minutes)}:${this.leadingZero(seconds)}`;
    }
  }

  leadingZero(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }


}
