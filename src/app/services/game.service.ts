import { Injectable } from '@angular/core';

interface Card {
  imagePath: string
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  cards: Card[] = []
  matchesFound = 0
  moveCount = 0
  gameStarted = false;

  constructor() { }

  initGame(cards: Card[]) {
    this.gameStarted = true;
    this.cards = this.shuffleCards(cards.concat(cards)); // duplicate cards
    this.matchesFound = 0;
    this.moveCount = 0;
  }

  shuffleCards(cards: Card[]): Card[] {
    // implement Fisher-Yates algorithm ...
    return this.cards
  }
}
