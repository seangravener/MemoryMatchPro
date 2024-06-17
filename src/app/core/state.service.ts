import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState, initialState } from './state.model';

const createInitialState = (): GameState => {
  return {
    ...initialState,
    // Deep copy to avoid mutations
    stats: initialState.stats.map((stat) => ({ ...stat })),
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
