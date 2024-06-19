import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';
import { GameStateService } from './game-state.service';
import { StatsService } from './stats.service';
import { TimerService } from './game-timer.service';
import { of } from 'rxjs';
import { GameState } from './state.model';
import { gameStateFixture } from './fixtures/game-state.fixtures';

describe('StateService', () => {
  let service: StateService;
  let gameStateServiceMock: Partial<GameStateService>;
  let gameStatsServiceMock: Partial<StatsService>;
  let gameTimerServiceMock: Partial<TimerService>;

  beforeEach(() => {
    gameStateServiceMock = {
      currentState$: of(gameStateFixture),
      currentState: gameStateFixture,
      updateGameState: jasmine.createSpy('updateGameState'),
      resetGameState: jasmine.createSpy('resetGameState')
    };

    gameStatsServiceMock = {
      currentStats$: of([]),
    };

    gameTimerServiceMock = {
      currentTime: 0,
    };

    TestBed.configureTestingModule({
      providers: [
        StateService,
        { provide: GameStateService, useValue: gameStateServiceMock },
        { provide: StatsService, useValue: gameStatsServiceMock },
        { provide: TimerService, useValue: gameTimerServiceMock },
      ],
    });

    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current state observable', (done) => {
    service.currentState$.subscribe((state) => {
      expect(state.isGameStarted).toBe(false);
      done();
    });
  });

  it('should return current state', () => {
    expect(service.currentState.isGameStarted).toBe(false);
  });

  it('should return current stats observable', (done) => {
    service.currentStats$.subscribe((stats) => {
      expect(stats).toEqual([]);
      done();
    });
  });

  it('should return current stats', () => {
    expect(service.currentStats).toEqual([]);
  });

  it('should return current time', () => {
    expect(service.currentTime).toBe(0);
  });

  it('should return whether the game is started', () => {
    expect(service.isGameStarted).toBe(false);
  });

  it('should toggle cheat mode', () => {
    service.toggleCheatMode();
    expect(gameStateServiceMock.updateGameState).toHaveBeenCalledWith({
      isCheatModeEnabled: true,
    });
  });

  it('should update game state', () => {
    const newState: Partial<GameState> = { isGameStarted: true };
    service.updateGameState(newState);
    expect(gameStateServiceMock.updateGameState).toHaveBeenCalledWith(newState);
  });

  it('should reset game state', () => {
    service.resetGameState();
    expect(gameStateServiceMock.resetGameState).toHaveBeenCalled();
  });
});
