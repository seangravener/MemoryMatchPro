import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { GameStat, GameStatId } from './state.model';
import { TimerService } from './game-timer.service';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  currentStats$: Observable<GameStat[]> = combineLatest([
    this.stateService.currentState$,
    this.timerService.currentTime$,
  ]).pipe(
    map(([state, currentTime]) => {
      return this.calculateStats(state.stats, currentTime).concat({
        id: GameStatId.TIME,
        label: 'Timer',
        value: currentTime,
      });
    }),
  );

  get currentStats() {
    return this.stateService.currentState.stats;
  }

  constructor(private stateService: GameStateService, private timerService: TimerService) {}

  // 100 points per match, minus 10 points per move
  // Time-dependent scoring: earlier matches are worth more
  private calculateStats(stats: GameStat[], currentTime: number): GameStat[] {
    const moves = this.getStat(GameStatId.MOVES);
    const matches = this.getStat(GameStatId.MATCHES);
    const timeFactor = Math.max(0, 100 - currentTime); // Reduce score benefit over time

    return stats.map(stat => {
      if (stat.id === GameStatId.SCORE) {
        const newScore = matches.value * (100 + timeFactor) - moves.value * 10;
        stat.value = Math.max(newScore, stat.value);
      }

      return stat;
    });
  }

  getStat(statId: GameStatId): GameStat {
    const stat = this.currentStats.find(stat => stat.id === statId);
    const defaultStat = { id: statId, label: '', value: 0 };

    return stat || defaultStat;
  }

  incrementMove() {
    this.stateService.updateGameState({
      stats: this.currentStats.map(stat =>
        stat.id === GameStatId.MOVES ? { ...stat, value: stat.value + 1 } : stat,
      ),
    });
  }

  incrementMatches() {
    this.stateService.updateGameState({
      stats: this.currentStats.map(stat =>
        stat.id === GameStatId.MATCHES ? { ...stat, value: stat.value + 1 } : stat,
      ),
    });
  }
}
