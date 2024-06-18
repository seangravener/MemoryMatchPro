import { GameState, GameStatId } from "../core/state.model";


export const initialGameState: GameState = {
  cards: [],
  isGameStarted: false,
  isProcessing: false,
  isCheatModeEnabled: false,
  stats: [
    { id: GameStatId.MOVES, label: 'Moves', value: 0 },
    { id: GameStatId.MATCHES, label: 'Matches', value: 0 },
    { id: GameStatId.SCORE, label: 'Score', value: 0 },
  ],
};
