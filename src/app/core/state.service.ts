import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState } from './state.model';
import { initialGameState } from "../config/initialGameState";

const createInitialState = (): GameState => {
  return {
    ...initialGameState,
    // Deep copy to avoid mutations
    stats: initialGameState.stats.map((stat) => ({ ...stat })),
  };
};

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private gameStateSubject = new BehaviorSubject<GameState>(
    createInitialState()
  );
  gameState$ = this.gameStateSubject.asObservable();

  get currentState() {
    return this.gameStateSubject.getValue();
  }

  constructor() {}

  updateGameState(newState: Partial<GameState>) {
    this.gameStateSubject.next({ ...this.currentState, ...newState });
  }

  resetGameState() {
    this.gameStateSubject.next(createInitialState());
  }
}
