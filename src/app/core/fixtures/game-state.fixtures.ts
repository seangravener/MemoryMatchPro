import { GameState } from '../state.model';

export const gameStateFixture: GameState = {
  stats: [],
  cards: [],
  isGameStarted: false,
  isProcessing: false,
  isCheatModeEnabled: false,
  highScores: [],
} as GameState;

export const cardFixture = {
  id: 1,
  flipped: false,
  matched: false,
  imageContent: 'imageContent',
};
