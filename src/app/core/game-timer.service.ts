import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameTimerService {
  private timer$: Observable<number> | undefined;
  private isRunning: boolean = false;
  private startTime: number = 0;

  private currentTimeSubject = new BehaviorSubject<number>(0);
  public currentTime$ = this.currentTimeSubject.asObservable();

  constructor() {}

  startTimer(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.startTime = Date.now();
    this.timer$ = timer(0, 1000).pipe(
      map(() => Math.floor((Date.now() - this.startTime) / 1000)),
      tap((time) => this.currentTimeSubject.next(time)),
      takeWhile(() => this.isRunning)
    );

    this.timer$.subscribe();
  }

  stopTimer(): void {
    this.isRunning = false;
    this.currentTimeSubject.next(0);
  }

  resetTimer(): void {
    this.stopTimer();
    this.startTimer();
  }
}
