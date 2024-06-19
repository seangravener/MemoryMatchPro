import { Injectable } from '@angular/core';
import { numberOfCardsOptions } from '../../config/initialGameState';
import { StateService } from '../../core/state.service';
import { CardsService } from '../../core/cards.service';
import { Card } from '../../core/state.model';
import { TimerService } from '../../core/game-timer.service';
import { StatsService } from '../../core/stats.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private stateService: StateService,
    private cardsService: CardsService,
    private statsService: StatsService,
    private timerService: TimerService
  ) {}

  initGame({
    numberOfCards = numberOfCardsOptions[2],
  }: { numberOfCards?: number } = {}) {
    const cards = this.cardsService.createCards(numberOfCards);
    this.stateService.updateGameState({
      isGameStarted: false,
      cards: this.cardsService.shuffleCards(cards),
    });
  }

  startGame() {
    this.resetGame();
    this.stateService.updateGameState({ isGameStarted: true });
    this.cardsService.peekCards(2000, 500, () => {
      this.timerService.startTimer();
    });
  }

  endGame() {
    this.stateService.updateGameState({ isGameStarted: false });
    this.timerService.stopTimer();
  }

  resetGame() {
    this.timerService.resetTimer();
    this.stateService.resetGameState();
    this.initGame();
  }

  handleCardFlip(cardId: number) {
    if (this.isGameAvailable()) {
      return;
    }

    const { cards } = this.stateService.currentState;
    const updatedCards = this.cardsService.flipCard(cards, cardId);
    const flippedCards = this.cardsService.findFlippedCards(updatedCards);

    if (flippedCards.length === 2) {
      this.processFlippedCards(flippedCards, updatedCards);
    } else {
      this.stateService.updateGameState({
        cards: updatedCards,
        isProcessing: false,
      });
    }
  }

  private processFlippedCards(flippedCards: Card[], currentCards: Card[]) {
    if (flippedCards.length !== 2) {
      return;
    }

    this.stateService.updateGameState({ isProcessing: true });

    if (this.cardsService.checkForMatch(flippedCards[0], flippedCards[1])) {
      this.stateService.updateGameState({
        cards: this.cardsService.markFlippedAsMatched(
          currentCards,
          flippedCards
        ),
        isProcessing: false,
      });
      this.statsService.incrementMatches();
    } else {
      this.cardsService.resetFlippedCardsAfterDelay(flippedCards, currentCards);
      this.stateService.updateGameState({ cards: currentCards });
    }

    this.statsService.incrementMove();
  }

  isGameAvailable(): boolean {
    const { isGameStarted: gameStarted, isProcessing } =
      this.stateService.currentState;
    return !gameStarted || isProcessing;
  }
}
