import { Injectable } from '@angular/core';

// prettier-ignore
const emojiSet: string[] = [
  '😀', '🐶', '🍕', '⚽', '🌈', '🍉', '🦄', '🚀',
  '🌵', '🎸', '🧩', '🎨', '🥇', '🎁', '🔔', '📚'
];

interface Card {
  id: number;
  flipped: boolean;
  matched: boolean;
  imageContent: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cards: Card[] = [];
  matchesFound = 0;
  moveCount = 0;
  gameStarted = false;

  constructor() {}

  initGame(cards: Card[]) {
    this.gameStarted = true;
    this.matchesFound = 0;
    this.moveCount = 0;

    this.cards = this.createCards();
    this.cards = this.shuffleCards(this.cards);
  }

  createCards() {
    const cardsWithEmojis: Card[] = [];
    const initCard = { flipped: false, matched: false };
    emojiSet.concat(emojiSet).forEach((emoji, index) => {
      cardsWithEmojis.push({ ...initCard, id: index, imageContent: emoji });
    });

    return cardsWithEmojis;
  }

  shuffleCards(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap
    }

    return cards;
  }

  handleCardFlip(cardIndex: number) {
    if (!this.gameStarted || this.cards[cardIndex].flipped) {
      return;
    }

    const flipped = this.cards.filter((card) => card.flipped && !card.matched);

    this.moveCount++;

    // @todo
    // flip card and check for matches
  }

  checkForMatch(card1: Card, card2: Card) {
    if (card1.id === card2.id && card1.imageContent === card2.imageContent) {
      this.matchesFound++;
      return true;
    }

    return false;
  }
}
