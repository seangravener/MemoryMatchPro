import { Injectable } from '@angular/core';

import { numberOfCardsOptions } from '../../config/initialGameState';
import { Card } from '../../core/state.model';
import { CardsService } from '../../core/cards.service';
import { LocalStorageService } from '../../core/local-storage.service';
import { TimerService } from '../../core/game-timer.service';
import { StateService } from '../../core/state.service';
import { StatsService } from '../../core/stats.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  get currentState() {
    return this.stateService.currentState;
  }

  constructor(
    private stateService: StateService,
    private cardsService: CardsService,
    private statsService: StatsService,
    private timerService: TimerService,
    private localStorageService: LocalStorageService
  ) {}

  initGame({
    numberOfCards = numberOfCardsOptions[2],
  }: { numberOfCards?: number } = {}) {
    const cards = this.cardsService.createCards(numberOfCards);
    const highScores = this.localStorageService.getHighScores() || [];

    console.log(highScores, 'highScores')

    this.stateService.updateState({
      highScores,
      isGameStarted: false,
      cards: this.cardsService.shuffleCards(cards),
    });
  }

  startGame() {
    this.resetGame();
    this.stateService.updateState({ isGameStarted: true });
    this.cardsService.peekCards(2000, 500, () => {
      this.timerService.startTimer();
    });
  }

  endGame() {
    this.stateService.updateState({ isGameStarted: false });
    this.localStorageService.saveHighScore(this.currentState);
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

    // @todo move card operations to exported funcs
    const updatedCards = this.cardsService.flipCard(cards, cardId);
    const flippedCards = this.cardsService.findFlippedCards(updatedCards);

    if (flippedCards.length === 2) {
      this.processFlippedCards(flippedCards, updatedCards);
    } else {
      this.stateService.updateState({
        cards: updatedCards,
        isProcessing: false,
      });
    }
  }

  private processFlippedCards(flippedCards: Card[], currentCards: Card[]) {
    if (flippedCards.length !== 2) {
      return;
    }

    this.stateService.updateState({ isProcessing: true });

    if (this.cardsService.checkForMatch(flippedCards[0], flippedCards[1])) {
      this.stateService.updateState({
        // @todo move to exported func
        cards: this.cardsService.markFlippedAsMatched(
          currentCards,
          flippedCards
        ),
        isProcessing: false,
      });
      this.statsService.incrementMatches();
    } else {
      this.cardsService.resetFlippedCardsAfterDelay(flippedCards, currentCards);
      this.stateService.updateState({ cards: currentCards });
    }

    this.statsService.incrementMove();
  }

  isGameAvailable(): boolean {
    const { isGameStarted, isProcessing } = this.stateService.currentState;
    return !isGameStarted || isProcessing;
  }
}
