// stats.service.ts
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameStateService } from './state.service';
import { GameState, GameStat, GameStatId } from './state.model';

@Injectable({
  providedIn: 'root',
})
export class GameStatsService {
  currentStats$: Observable<GameStat[]> = this.gameStateService.gameState$.pipe(
    map(({ stats }) => this.calculateStats(stats))
  );

  get currentStats() {
    return this.gameStateService.currentState.stats;
  }

  constructor(private gameStateService: GameStateService) {}

  // 100 points per match, minus 10 points per move
  private calculateStats(stats: GameStat[]): GameStat[] {
    return stats.map((stat) => {
      if (stat.id === GameStatId.SCORE) {
        stat.value = stat.value * 100 - stat.value * 10;
      }

      return stat;
    });
  }

  incrementMove() {
    console.log(this.currentStats);
    this.gameStateService.updateGameState({
      stats: this.currentStats.map((stat) => {
        if (stat.id === GameStatId.MOVES) {
          stat.value = stat.value + 1;
        }

        return stat;
      }),
    });
  }

  incrementMatches() {
    this.gameStateService.updateGameState({
      stats: this.currentStats.map((stat) => {
        if (stat.id === GameStatId.MATCHES) {
          stat.value = stat.value + 1;
        }

        return stat;
      }),
    });
  }
}
