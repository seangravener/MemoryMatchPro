import { TestBed } from '@angular/core/testing';
import { GameStateService } from './game-state.service';
import { Card, GameState } from './state.model';
import { initialGameState } from '../config/initialGameState';

describe('GameStateService', () => {
  let service: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameStateService],
    });
    service = TestBed.inject(GameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with the correct state', () => {
    expect(service.currentState).toEqual({
      ...initialGameState,
      stats: initialGameState.stats.map((stat) => ({ ...stat })),
    });
  });

  it('should update the game state correctly', () => {
    const newState: Partial<GameState> = {
      isGameStarted: true,
    };
    service.updateGameState(newState);
    expect(service.currentState.isGameStarted).toBe(true);
  });

  it('should reset the game state correctly', () => {
    service.updateGameState({ isGameStarted: true });
    expect(service.currentState.isGameStarted).toBe(true);
    service.resetGameState();
    expect(service.currentState).toEqual({
      ...initialGameState,
      stats: initialGameState.stats.map((stat) => ({ ...stat })),
    });
  });

  it('should provide current state as observable', (done) => {
    service.currentState$.subscribe((state) => {
      expect(state).toEqual({
        ...initialGameState,
        stats: initialGameState.stats.map((stat) => ({ ...stat })),
      });
      done();
    });
  });

  it('should provide current cards as observable', (done) => {
    const mockCards = [{ id: 1, flipped: false, matched: false }] as Card[];
    service.updateGameState({ cards: mockCards });

    service.currentCards$.subscribe((cards) => {
      expect(cards).toEqual(mockCards);
      done();
    });
  });
});
