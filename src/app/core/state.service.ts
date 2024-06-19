import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import { StatsService } from './stats.service';
import { TimerService } from './game-timer.service';
import { GameState } from './state.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(
    private gameStateService: GameStateService,
    private gameStatsService: StatsService,
    private gameTimerService: TimerService
  ) {}

  get currentState$() {
    return this.gameStateService.currentState$;
  }

  get currentState() {
    return this.gameStateService.currentState;
  }

  get currentStats$() {
    return this.gameStatsService.currentStats$;
  }

  get currentStats() {
    return this.gameStateService.currentState.stats;
  }

  get currentTime() {
    return this.gameTimerService.currentTime;
  }

  get isGameStarted() {
    return this.gameStateService.currentState.isGameStarted;
  }

  toggleCheatMode() {
    const { isCheatModeEnabled } = this.gameStateService.currentState;
    this.gameStateService.updateGameState({ isCheatModeEnabled: !isCheatModeEnabled });
  }

  updateGameState(newState: Partial<GameState>) {
    this.gameStateService.updateGameState(newState);
  }

  resetGameState() {
    this.gameStateService.resetGameState();
  }
}
