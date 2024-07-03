import { GameState } from '../state.model';
import { Theme } from '../theme.service';

export const gameStateFixture: GameState = {
  stats: [],
  cards: [],
  isGameStarted: false,
  isProcessing: false,
  isCheatModeEnabled: false,
  isGameWon: false,
  highScores: [],
  theme: Theme.Beach,
  boardOverlay: { show: false, type: 'instructions' },
} as GameState;

export const cardFixture = {
  id: 1,
  flipped: false,
  matched: false,
  imageContent: 'imageContent',
};
