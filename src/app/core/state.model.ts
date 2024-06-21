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

export interface Player {
  name: string;
}

export interface HighScore {
  date: Date;
  player: Player;
  stats: GameStat[];
}

export interface GameState {
  cards: Card[];
  stats: GameStat[];
  isGameStarted: boolean;
  isProcessing: boolean;
  isCheatModeEnabled: boolean;
  highScores: HighScore[];
}


