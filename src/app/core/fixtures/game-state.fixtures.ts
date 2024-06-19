import { GameState } from '../state.model';

export const gameStateFixture: GameState = {
  isGameStarted: false,
  stats: [],
  cards: [],
  isProcessing: false,
  isCheatModeEnabled: false,
} as GameState;

export const cardFixture = {
  id: 1,
  flipped: false,
  matched: false,
  imageContent: 'imageContent',
};
