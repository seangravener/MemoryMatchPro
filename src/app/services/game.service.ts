import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private cards: Card[] = [];
  private isProcessing = false;
  matchesFound = 0;
  moveCount = 0;
  gameStarted = false;

  private cardsSubject: BehaviorSubject<Card[]> = new BehaviorSubject([
    {} as Card,
  ]);
  private gamePlayStatusSubject: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );

  cards$ = this.cardsSubject.asObservable();
  gamePlayStatus$ = this.gamePlayStatusSubject.asObservable();

  constructor() {}

  initGame() {
    this.gameStarted = true;
    this.matchesFound = 0;
    this.moveCount = 0;

    this.cards = this.shuffleCards(this.createCards());
    this.cardsSubject.next(this.cards);
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

  handleCardFlip(cardId: number): void {
    if (!this.gameStarted || this.isProcessing) {
      console.log('Game has not started or is processing');
      return;
    }

    const updatedCards = this.flipCard(this.cards, cardId);
    const flippedCards = this.getFlippedCards(updatedCards);

    if (flippedCards.length === 2) {
      this.isProcessing = true;
      this.processFlippedCards(flippedCards, updatedCards);
    } else {
      this.isProcessing = false;
      this.updateGameState(updatedCards);
    }
  }

  // Toggle the flip state of a specific card
  private flipCard(cards: Card[], cardId: number): Card[] {
    return cards.map((card) =>
      card.id === cardId ? { ...card, flipped: !card.flipped } : card
    );
  }

  // Filter out cards that are currently flipped and not matched
  private getFlippedCards(cards: Card[]): Card[] {
    return cards.filter((card) => card.flipped && !card.matched);
  }

  // Determine the game logic based on the flipped cards
  private processFlippedCards(
    flippedCards: Card[],
    updatedCards: Card[]
  ): void {
    if (flippedCards.length === 2) {
      this.moveCount++;
      if (this.checkForMatch(flippedCards[0], flippedCards[1])) {
        this.matchesFound++;
        this.markCardsAsMatched(flippedCards);
        this.isProcessing = false;
      } else {
        this.resetFlippedCardsAfterDelay(flippedCards, updatedCards);
      }
    }

    this.updateGameState(updatedCards);
  }

  private markCardsAsMatched(flippedCards: Card[]): void {
    flippedCards.forEach((card) => (card.matched = true));
  }

  private resetFlippedCardsAfterDelay(
    flippedCards: Card[],
    updatedCards: Card[]
  ): void {
    setTimeout(() => {
      flippedCards.forEach((card) => (card.flipped = false));
      this.isProcessing = false;
      this.cardsSubject.next(updatedCards);
    }, 1000);
  }

  private updateGameState(updatedCards: Card[]): void {
    this.cards = updatedCards; // Update the internal state with new cards
    this.cardsSubject.next(updatedCards); // Publish the new state
  }

  checkForMatch(card1: Card, card2: Card) {
    if (card1.imageContent === card2.imageContent) {
      this.matchesFound++;
      return true;
    }

    return false;
  }
}
