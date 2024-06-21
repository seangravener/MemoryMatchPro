import { Injectable } from '@angular/core';
import { GameState, HighScore } from './state.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storageKey = 'MemoryGameState';

  constructor() {}

  saveHighScore(state: GameState): void {
    const currentHighScores: HighScore[] = this.getHighScores();
    currentHighScores.push({
      date: new Date(),
      player: { name: 'Player 1' },
      stats: state.stats,
    });
    this.saveToLocalStorage(currentHighScores);
  }

  getHighScores(): HighScore[] {
    const savedState = localStorage.getItem(this.storageKey);
    return savedState ? JSON.parse(savedState).highScores : [];
  }

  getState(): Partial<GameState> {
    const savedState = localStorage.getItem(this.storageKey);
    return savedState ? JSON.parse(savedState) : null;
  }

  private saveToLocalStorage(highScores: HighScore[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify({ highScores }));
  }
}
