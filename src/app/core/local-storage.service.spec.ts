import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { GameStatId, GameState } from './state.model';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    // Clear localStorage for consistent testing environment
    localStorage.clear();
  });

  it('should save and retrieve high scores correctly', () => {
    const stats = [{ id: GameStatId.SCORE, label: 'Score', value: 100 }];
    const fakeState: GameState = {
      cards: [],
      stats,
      isGameStarted: false,
      isProcessing: false,
      isCheatModeEnabled: false,
      highScores: [
        {
          player: { name: '' },
          date: new Date(),
          stats,
        },
      ],
    };

    service.saveHighScore(fakeState);
    const scores = service.getHighScores();
    expect(scores.length).toBe(1);
    expect(scores[0].player.name).toEqual('Player 1');
    expect(scores[0].stats[0].value).toEqual(100);
  });
});
