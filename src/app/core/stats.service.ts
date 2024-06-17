// stats.service.ts
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameStateService } from './state.service';
import { GameStat, GameStatId } from './state.model';

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
    const moves = this.getStat(GameStatId.MOVES);
    const matches = this.getStat(GameStatId.MATCHES);

    return stats.map((stat) => {
      if (stat.id === GameStatId.SCORE) {
        stat.value = matches.value * 100 - moves.value * 10;
      }

      return stat;
    });
  }

  getStat(statId: GameStatId): GameStat {
    const stat = this.currentStats.find((stat) => stat.id === statId);
    const defaultStat = { id: statId, label: '', value: 0 };

    return stat ? stat : defaultStat;
  }

  incrementMove() {
    this.gameStateService.updateGameState({
      stats: this.currentStats.map((stat) =>
        stat.id === GameStatId.MOVES ? { ...stat, value: stat.value + 1 } : stat
      ),
    });
  }

  incrementMatches() {
    this.gameStateService.updateGameState({
      stats: this.currentStats.map((stat) =>
        stat.id === GameStatId.MATCHES
          ? { ...stat, value: stat.value + 1 }
          : stat
      ),
    });
  }
}
