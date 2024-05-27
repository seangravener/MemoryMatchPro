export interface Card {
  id: number;
  flipped: boolean;
  matched: boolean;
  imageContent: string;
}

export interface GameStats {
  moves: number;
  matches: number;
  score: number;
}

export interface GameState {
  cards: Card[];
  gameStarted: boolean;
  isProcessing: boolean;
  stats: GameStats;
}

export const initialState: GameState = {
  cards: [],
  gameStarted: false,
  isProcessing: false,
  stats: {
    moves: 0,
    matches: 0,
    score: 0,
  },
};
