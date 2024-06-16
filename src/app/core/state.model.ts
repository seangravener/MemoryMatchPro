export interface Card {
  id: number;
  flipped: boolean;
  matched: boolean;
  imageContent: string;
}

export enum GameStatId {
  MOVES = 'moves',
  MATCHES = 'matches',
  SCORE = 'score',
}

export interface GameStat {
  id: GameStatId;
  label: string;
  value: number;
}

export interface GameState {
  cards: Card[];
  gameStarted: boolean;
  isProcessing: boolean;
  stats: GameStat[];
}

export const initialState: GameState = {
  cards: [],
  gameStarted: false,
  isProcessing: false,
  stats: [
    { id: GameStatId.MOVES, label: 'Moves', value: 0 },
    { id: GameStatId.MATCHES, label: 'Matches', value: 0 },
    { id: GameStatId.SCORE, label: 'Score', value: 0 },
  ],
};
