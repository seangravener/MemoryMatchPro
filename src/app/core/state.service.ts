import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState, initialState } from './state.model';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private gameState: GameState = { ...initialState };
  private gameStateSubject = new BehaviorSubject<GameState>(this.gameState);
  gameState$ = this.gameStateSubject.asObservable();

  get currentState() {
    return this.gameState;
  }

  constructor() {}

  updateGameState(newState: Partial<GameState>) {
    this.gameState = { ...this.gameState, ...newState };
    this.gameStateSubject.next(this.gameState);
  }

  resetGameState() {
    this.gameState = { ...initialState };
    this.gameStateSubject.next(this.gameState);
  }
}
