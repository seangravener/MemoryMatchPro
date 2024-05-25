import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { Card, GameState } from './game.model';
import { emojiSet } from '../core/constants/emojiSet';
import { GameStateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cards$ = this.gameState.gameState$.pipe(
    map((state: GameState) => state.cards)
  );

  constructor(private gameState: GameStateService) {}

  initGame() {
    this.gameState.updateGameState({
      gameStarted: true,
      cards: this.shuffleCards(this.createCards()),
    });
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

  isGameAvailable(): boolean {
    const { gameStarted, isProcessing } = this.gameState.getCurrentState();
    return !gameStarted || isProcessing;
  }

  handleCardFlip(cardId: number): void {
    if (this.isGameAvailable()) {
      console.log('Game has not started or is processing');
      return;
    }

    const { cards } = this.gameState.getCurrentState();
    const updatedCards = this.flipCard(cards, cardId);
    const flippedCards = this.getFlippedCards(updatedCards);

    if (flippedCards.length === 2) {
      this.gameState.updateGameState({ isProcessing: true });
      this.processFlippedCards(flippedCards, updatedCards);
    } else {
      this.gameState.updateGameState({
        cards: updatedCards,
        isProcessing: false,
      });
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
      const { moveCount } = this.gameState.getCurrentState();
      this.gameState.updateGameState({ moveCount });

      if (this.checkForMatch(flippedCards[0], flippedCards[1])) {
        const matchesFound = this.gameState.getCurrentState().matchesFound++;
        this.markCardsAsMatched(flippedCards);
        this.gameState.updateGameState({ isProcessing: false, matchesFound });
      } else {
        this.resetFlippedCardsAfterDelay(flippedCards, updatedCards);
      }
    }

    this.gameState.updateGameState({ cards: updatedCards });
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

      this.gameState.updateGameState({
        cards: updatedCards,
        isProcessing: false,
      });
    }, 1000);
  }

  checkForMatch(card1: Card, card2: Card) {
    if (card1.imageContent === card2.imageContent) {
      let { matchesFound } = this.gameState.getCurrentState();
      this.gameState.updateGameState({ matchesFound: matchesFound++ });
      return true;
    }

    return false;
  }
}
