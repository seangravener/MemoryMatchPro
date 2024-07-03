import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, of } from 'rxjs';
import { GameState } from './state.model';
import { initialGameState } from '../config/initialGameState';
import { LocalStorageService } from './local-storage.service';

const createInitialState = (): GameState => {
  return {
    ...initialGameState,
    // Deep copy to avoid mutations
    stats: initialGameState.stats.map(stat => ({ ...stat })),
  };
};

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private gameStateSubject = new BehaviorSubject<GameState>(createInitialState());
  private localState$ = this.localStorageService.getLocalStorageState();
  currentState$ = combineLatest([of(this.localState$), this.gameStateSubject.asObservable()]).pipe(
    map(([state, localState]) => {
      return { ...state, ...localState };
    }),
  );

  get currentState() {
    return this.gameStateSubject.getValue();
  }

  get currentCards$() {
    return this.currentState$.pipe(map(state => state.cards));
  }

  constructor(private localStorageService: LocalStorageService) {}

  updateGameState(newState: Partial<GameState>) {
    this.gameStateSubject.next({ ...this.currentState, ...newState });
  }

  resetGameState() {
    this.gameStateSubject.next(createInitialState());
  }
}
