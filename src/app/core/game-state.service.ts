import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { GameState } from './state.model';
import { initialGameState } from '../config/initialGameState';

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
  currentState$ = this.gameStateSubject.asObservable();

  get currentState() {
    return this.gameStateSubject.getValue();
  }

  get currentCards$() {
    return this.currentState$.pipe(map((state) => state.cards));
  }

  updateGameState(newState: Partial<GameState>) {
    this.gameStateSubject.next({ ...this.currentState, ...newState });
  }

  resetGameState() {
    this.gameStateSubject.next(createInitialState());
  }
}
