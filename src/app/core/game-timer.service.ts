import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private isRunning: boolean = false;
  private startTime: number = 0;
  private subs = new Subscription();

  private currentTimeSubject = new BehaviorSubject<number>(0);
  public currentTime$ = this.currentTimeSubject.asObservable();

  timeInPlay$ = timer(0, 1000).pipe(
    takeWhile(() => this.isRunning),
    map(() => Math.floor((Date.now() - this.startTime) / 1000)),
    map((time) => time.toString()),
    tap((time) => this.currentTimeSubject.next(parseInt(time, 10)))
  );

  get currentTime() {
    return this.currentTimeSubject.getValue();
  }

  get isTimerRunning() {
    return this.isRunning;
  }

  startTimer(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.startTime = Date.now();
    this.subs.add(this.timeInPlay$.subscribe());
  }

  stopTimer(): void {
    this.isRunning = false;
    this.currentTimeSubject.next(this.currentTime);
  }

  resetTimer(): void {
    this.stopTimer();
    this.currentTimeSubject.next(0);
  }

  destroyTimer(): void {
    this.stopTimer();
    this.subs.unsubscribe();
  }
}
