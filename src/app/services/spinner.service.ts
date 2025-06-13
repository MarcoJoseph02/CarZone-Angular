import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerCounter = new BehaviorSubject<number>(0);
  public spinnerCounter$ = this.spinnerCounter.asObservable();

  constructor() {}

  public show():void {
    this.spinnerCounter.next(this.spinnerCounter.value + 1);
  }
  public hide():void {
    this.spinnerCounter.next(this.spinnerCounter.value - 1);
  }
}
