export interface Card {
  id: number;
  flipped: boolean;
  matched: boolean;
  imageContent: string;
}

export interface GameState {
  cards: Card[];
  gameStarted: boolean;
  matchesFound: number;
  moveCount: number;
  isProcessing: boolean;
}

export const initialState: GameState = {
  cards: [],
  gameStarted: false,
  matchesFound: 0,
  moveCount: 0,
  isProcessing: false,
};
