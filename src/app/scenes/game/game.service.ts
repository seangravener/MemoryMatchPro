import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { emojiSet } from '../../config/emojiSet';
import { Card, GameState } from '../../core/state.model';
import { GameStateService } from '../../core/state.service';
import { GameStatsService } from '../../core/stats.service';
import { GameTimerService } from '../../core/game-timer.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cards$ = this.gameState.gameState$.pipe(
    map((state: GameState) => state.cards)
  );

  get currentState$() {
    return this.gameState.gameState$;
  }

  get currentState() {
    return this.gameState.currentState;
  }

  get currentStats() {
    return this.gameState.currentState.stats;
  }

  get currentTime() {
    return this.gameTimer.currentTime;
  }

  get isGameStarted() {
    return this.gameState.currentState.isGameStarted;
  }

  constructor(
    private gameState: GameStateService,
    private gameStats: GameStatsService,
    private gameTimer: GameTimerService
  ) {}

  initGame() {
    this.gameState.updateGameState({
      isGameStarted: false,
      cards: this.shuffleCards(this.createCards()),
    });
  }

  startGame() {
    this.gameState.updateGameState({ isGameStarted: true });
    this.gameTimer.startTimer();
  }

  endGame() {
    this.gameState.updateGameState({ isGameStarted: false });
    this.gameTimer.stopTimer();
    // create score snapshot for leaderboard
  }

  toggleCheatMode() {
    this.gameState.toggleCheatMode();
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
    const { isGameStarted: gameStarted, isProcessing } =
      this.gameState.currentState;
    return !gameStarted || isProcessing;
  }

  handleCardFlip(cardId: number): void {
    if (this.isGameAvailable()) {
      return;
    }

    const { cards } = this.gameState.currentState;
    const updatedCards = this.flipCard(cards, cardId);
    const flippedCards = this.findFlippedCards(updatedCards);

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

  private findFlippedCards(cards: Card[]): Card[] {
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
      this.gameStats.incrementMatches();
    } else {
      this.resetFlippedCardsAfterDelay(flippedCards, currentCards);
      this.gameState.updateGameState({ cards: currentCards });
    }

    this.gameStats.incrementMove();
  }

  private markFlippedAsMatched(
    currentCards: Card[],
    flippedCards: Card[]
  ): Card[] {
    const isFlippedCard = (card: Card) =>
      flippedCards.some((flippedCard) => flippedCard.id === card.id);
    const updateCardProperties = (card: Card, props: Partial<Card>): Card => {
      if (isFlippedCard(card)) {
        return { ...card, ...props };
      }
      return card;
    };

    // Initially set matched to false for flipped cards
    const updatedCards = currentCards.map((card) =>
      updateCardProperties(card, { matched: false })
    );

    setTimeout(() => {
      this.gameState.updateGameState({
        cards: updatedCards.map((card) =>
          updateCardProperties(card, { matched: true })
        ),
      });
    }, 400); // Delay slightly longer than the flip animation duration

    return updatedCards;
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

  resetGame() {
    this.gameTimer.resetTimer();
    this.gameState.resetGameState();
  }
}
