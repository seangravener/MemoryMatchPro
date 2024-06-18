export interface Card {
  id: number;
  flipped: boolean;
  matched: boolean;
  imageContent: string;
}

export enum GameStatId {
  UNDEFINED = '',
  MOVES = 'moves',
  MATCHES = 'matches',
  SCORE = 'score',
  TIME = 'time',
}

export interface GameStat {
  id: GameStatId;
  label: string;
  value: number;
}

export interface GameState {
  cards: Card[];
  isGameStarted: boolean;
  stats: GameStat[];
  isProcessing: boolean;
  isCheatModeEnabled: boolean;
}


