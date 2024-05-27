// stats.service.ts
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameStateService } from './state.service';
import { GameStats, GameState } from './state.model';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  currentStats$: Observable<GameStats>;

  constructor(private gameStateService: GameStateService) {
    this.currentStats$ = this.gameStateService.gameState$.pipe(
      map((state) => this.calculateStats(state))
    );
  }

  private calculateStats(state: GameState): GameStats {
    // 100 points per match, minus 10 points per move
    const score = state.stats.matches * 100 - state.stats.moves * 10;

    return {
      ...state.stats,
      score: score,
    };
  }
}
