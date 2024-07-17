import { GameState, GameStatId, NumberOfCardsOptions } from '../core/state.model';
import { Theme } from '../core/theme.service';

export const numberOfCards: NumberOfCardsOptions = 32;
export const numberOfCardsOptions: NumberOfCardsOptions[] = [8, 16, 24, 32, 40];
export const initialGameState: GameState = {
  cards: new Array(numberOfCards).fill(null),
  numberOfCards,
  isGameStarted: false,
  isProcessing: false,
  isCheatModeEnabled: false,
  theme: Theme.Beach,
  highScores: [],
  stats: [
    { id: GameStatId.MOVES, label: 'Moves', value: 0 },
    { id: GameStatId.MATCHES, label: 'Matches', value: 0 },
    { id: GameStatId.SCORE, label: 'Score', value: 0 },
  ],
  boardOverlay: {
    show: false,
    type: 'instructions',
  },
};
