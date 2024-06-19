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
    private statsService: StatsService,
    private timerService: TimerService
  ) {}

  get currentState$() {
    return this.gameStateService.currentState$;
  }

  get currentState() {
    return this.gameStateService.currentState;
  }

  get currentStats$() {
    return this.statsService.currentStats$;
  }

  get currentStats() {
    return this.gameStateService.currentState.stats;
  }

  get currentTime() {
    return this.timerService.currentTime;
  }

  get isGameStarted() {
    return this.gameStateService.currentState.isGameStarted;
  }

  toggleCheatMode() {
    const { isCheatModeEnabled } = this.gameStateService.currentState;
    this.updateState({ isCheatModeEnabled: !isCheatModeEnabled });
  }

  updateState(newState: Partial<GameState>) {
    this.gameStateService.updateGameState(newState);
  }

  resetGameState() {
    this.gameStateService.resetGameState();
  }
}
