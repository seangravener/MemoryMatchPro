import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameStateService } from './state.service';
import { GameStats } from './stats.model';
import { GameState } from './state.model';

const initialState: GameStats = {
  moves: 0,
  matches: 0,
  gameInProgress: false,
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private statsSubject = new BehaviorSubject<GameStats>(initialState);
  stats$ = this.statsSubject.asObservable();

  constructor(private gameState: GameStateService) {
    this.gameState.gameState$.subscribe((state) => {
      this.updateStats(state);
    });
  }

  private updateStats(state: GameState): void {
    const stats: GameStats = {
      moves: state.moveCount,
      matches: state.matchesFound,
      gameInProgress: state.gameStarted && !state.isProcessing,
    };
    this.statsSubject.next(stats);
  }

  // Additional utility methods for stats can be added here
}
