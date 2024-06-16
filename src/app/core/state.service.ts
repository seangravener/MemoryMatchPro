import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState, initialState } from './state.model';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private gameStateSubject = new BehaviorSubject<GameState>({
    ...initialState,
  });
  gameState$ = this.gameStateSubject.asObservable();

  get currentState() {
    return this.gameStateSubject.getValue();
  }

  constructor() {}

  updateGameState(newState: Partial<GameState>) {
    this.gameStateSubject.next({ ...this.currentState, ...newState });
  }

  resetGameState() {
    this.gameStateSubject.next({ ...this.currentState });
  }
}
