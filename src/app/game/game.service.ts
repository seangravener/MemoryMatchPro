import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { emojiSet } from './constants/emojiSet';
import { Card, GameState } from './state.model';
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
    let shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ]; // Swap using destructuring
    }

    return shuffledCards;
  }

  isGameAvailable(): boolean {
    const { gameStarted, isProcessing } = this.gameState.currentState;
    return !gameStarted || isProcessing;
  }

  handleCardFlip(cardId: number): void {
    if (this.isGameAvailable()) {
      console.log('Game has not started or is processing');
      return;
    }

    const { cards } = this.gameState.currentState;
    const updatedCards = this.flipCard(cards, cardId);
    const flippedCards = this.getFlippedCards(updatedCards);

    if (flippedCards.length === 2) {
      this.processFlippedCards(flippedCards, updatedCards);
    } else {
      this.gameState.updateGameState({
        cards: updatedCards,
        isProcessing: false,
      });
    }
  }

  private flipCard(cards: Card[], cardId: number): Card[] {
    return cards.map((card) =>
      card.id === cardId && !card.flipped ? { ...card, flipped: true } : card
    );
  }

  private getFlippedCards(cards: Card[]): Card[] {
    return cards.filter((card) => card.flipped && !card.matched);
  }

  private processFlippedCards(
    flippedCards: Card[],
    currentCards: Card[]
  ): void {
    if (flippedCards.length !== 2) {
      return;
    }

    this.gameState.updateGameState({ isProcessing: true });

    if (this.checkForMatch(flippedCards[0], flippedCards[1])) {
      this.gameState.updateGameState({
        cards: this.markFlippedAsMatched(currentCards, flippedCards),
        isProcessing: false,
      });
      this.gameState.incrementMatches();
    } else {
      this.resetFlippedCardsAfterDelay(flippedCards, currentCards);
      this.gameState.updateGameState({ cards: currentCards });
    }

    this.gameState.incrementMove();
  }

  private markFlippedAsMatched(
    currentCards: Card[],
    flippedCards: Card[]
  ): Card[] {
    return currentCards.map((card) => {
      if (flippedCards.some((flippedCard) => flippedCard.id === card.id)) {
        return { ...card, matched: true };
      }
      return card;
    });
  }

  private resetFlippedCardsAfterDelay(
    flippedCards: Card[],
    updatedCards: Card[]
  ): void {
    setTimeout(() => {
      const cards = updatedCards.map((card) =>
        flippedCards.find((fc) => fc.id === card.id)
          ? { ...card, flipped: false }
          : card
      );

      this.gameState.updateGameState({ cards, isProcessing: false });
    }, 1000);
  }

  checkForMatch(card1: Card, card2: Card) {
    return card1.imageContent === card2.imageContent;
  }
}
