import { TestBed } from '@angular/core/testing';
import { StatsService } from './stats.service';
import { GameStateService } from './game-state.service';
import { TimerService } from './game-timer.service';
import { of } from 'rxjs';
import { GameStat, GameStatId } from './state.model';
import { gameStateFixture } from './fixtures/game-state.fixtures';

const currentState = {
  ...gameStateFixture,
  stats: [
    { id: GameStatId.MOVES, label: 'Moves', value: 0 },
    { id: GameStatId.MATCHES, label: 'Matches', value: 0 },
    { id: GameStatId.SCORE, label: 'Score', value: 0 },
  ],
};

describe('GameStatsService', () => {
  let service: StatsService;
  let gameStateServiceMock: Partial<GameStateService>;
  let gameTimerServiceMock: Partial<TimerService>;

  beforeEach(() => {
    gameStateServiceMock = {
      currentState$: of(currentState),
      currentState: currentState,
      updateGameState: jasmine.createSpy('updateGameState'),
    };

    gameTimerServiceMock = {
      currentTime$: of(0),
    };

    TestBed.configureTestingModule({
      providers: [
        StatsService,
        { provide: GameStateService, useValue: gameStateServiceMock },
        { provide: TimerService, useValue: gameTimerServiceMock },
      ],
    });

    service = TestBed.inject(StatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current stats observable', (done) => {
    service.currentStats$.subscribe((stats) => {
      expect(stats).toEqual([
        { id: GameStatId.MOVES, label: 'Moves', value: 0 },
        { id: GameStatId.MATCHES, label: 'Matches', value: 0 },
        { id: GameStatId.SCORE, label: 'Score', value: 0 },
        { id: GameStatId.TIME, label: 'Timer', value: 0 },
      ]);
      done();
    });
  });

  it('should return current stats', () => {
    expect(service.currentStats).toEqual([
      { id: GameStatId.MOVES, label: 'Moves', value: 0 },
      { id: GameStatId.MATCHES, label: 'Matches', value: 0 },
      { id: GameStatId.SCORE, label: 'Score', value: 0 },
    ]);
  });

  it('should increment move', () => {
    service.incrementMove();
    expect(gameStateServiceMock.updateGameState).toHaveBeenCalledWith({
      stats: [
        { id: GameStatId.MOVES, label: 'Moves', value: 1 },
        { id: GameStatId.MATCHES, label: 'Matches', value: 0 },
        { id: GameStatId.SCORE, label: 'Score', value: 0 },
      ],
    });
  });

  it('should increment matches', () => {
    service.incrementMatches();
    expect(gameStateServiceMock.updateGameState).toHaveBeenCalledWith({
      stats: [
        { id: GameStatId.MOVES, label: 'Moves', value: 0 },
        { id: GameStatId.MATCHES, label: 'Matches', value: 1 },
        { id: GameStatId.SCORE, label: 'Score', value: 0 },
      ],
    });
  });

  it('should calculate stats correctly', () => {
    const stats: GameStat[] = [
      { id: GameStatId.MOVES, label: 'Moves', value: 10 },
      { id: GameStatId.MATCHES, label: 'Matches', value: 5 },
      { id: GameStatId.SCORE, label: 'Score', value: 0 },
    ];
    const currentTime = 50;

    spyOn(service, 'getStat').and.callFake((statId: GameStatId) => {
      switch (statId) {
        case GameStatId.MOVES:
          return { id: GameStatId.MOVES, label: 'Moves', value: 10 };
        case GameStatId.MATCHES:
          return { id: GameStatId.MATCHES, label: 'Matches', value: 5 };
        default:
          return { id: statId, label: '', value: 0 };
      }
    });

    const result = service['calculateStats'](stats, currentTime);

    const expectedScore = 5 * (100 + (100 - currentTime)) - 10 * 10; // (5 * 150) - 100 = 650
    expect(result).toEqual([
      { id: GameStatId.MOVES, label: 'Moves', value: 10 },
      { id: GameStatId.MATCHES, label: 'Matches', value: 5 },
      { id: GameStatId.SCORE, label: 'Score', value: expectedScore },
    ]);
  });

  it('should return the correct stat by ID', () => {
    const stat = service.getStat(GameStatId.MOVES);
    expect(stat).toEqual({ id: GameStatId.MOVES, label: 'Moves', value: 0 });
  });

  it('should return a default stat if ID not found', () => {
    const stat = service.getStat(GameStatId.UNDEFINED);
    expect(stat).toEqual({ id: GameStatId.UNDEFINED, label: '', value: 0 });
  });
});
