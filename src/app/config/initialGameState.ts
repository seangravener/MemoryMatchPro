import { GameState, GameStatId } from '../core/state.model';

export const initialGameState: GameState = {
  cards: new Array(16).fill(null),
  isGameStarted: false,
  isProcessing: false,
  isCheatModeEnabled: false,
  highScores: [],
  stats: [
    { id: GameStatId.MOVES, label: 'Moves', value: 0 },
    { id: GameStatId.MATCHES, label: 'Matches', value: 0 },
    { id: GameStatId.SCORE, label: 'Score', value: 0 },
  ],
};

export const numberOfCardsOptions = [8, 16, 32, 64];
export const numberOfCards = numberOfCardsOptions[2];
