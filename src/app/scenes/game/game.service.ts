import { Injectable } from '@angular/core';

import { Card, GameState, GameStatId, NumberOfCardsOptions } from '../../core/state.model';
import { CardsService } from '../../core/cards.service';
import { LocalStorageService } from '../../core/local-storage.service';
import { TimerService } from '../../core/game-timer.service';
import { StateService } from '../../core/state.service';
import { StatsService } from '../../core/stats.service';
import { CardAction } from './components/card/card.component';
import { numberOfCardsOptions } from '../../config/initialGameState';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  get currentState() {
    return this.stateService.currentState;
  }

  get currentNumberOfCards(): NumberOfCardsOptions {
    return this.stateService.currentState.cards.length as NumberOfCardsOptions;
  }

  set currentNumberOfCards(value: NumberOfCardsOptions) {
    this.initGame({ numberOfCards: value });
  }

  get numberOfCardsOptions() {
    return numberOfCardsOptions;
  }

  get isGameWon() {
    return this.currentState.cards.filter(card => Boolean(card)).every(card => card.matched);
  }

  constructor(
    private stateService: StateService,
    private cardsService: CardsService,
    private statsService: StatsService,
    private timerService: TimerService,
    private localStorageService: LocalStorageService,
  ) {}

  initGame(options: { numberOfCards?: NumberOfCardsOptions } = {}) {
    const { numberOfCards = this.currentNumberOfCards } = options;
    const cards = this.cardsService.createCards(numberOfCards);
    const highScores = this.localStorageService.getHighScores() || [];

    // console.log(highScores, 'highScores')
    this.stateService.updateState({
      highScores,
      isGameStarted: false,
      cards: this.cardsService.shuffleCards(cards),
    });
  }

  startGame() {
    this.resetGame();
    this.stateService.updateState({ isGameStarted: true });
    this.cardsService.peekCards(2000, 250, () => {
      this.timerService.startTimer();
    });
  }

  winGame() {
    const currentCards = this.stateService.currentState.cards;

    const cards = currentCards.map(card => ({
      ...card,
      flipped: true,
      matched: true,
    }));

    // @TODO calculateStats() in stats service
    const stats = {
      ...this.statsService.currentStats.map(stat => {
        if (stat.id === GameStatId.MATCHES) {
          stat.value = currentCards.length / 2;
        }

        return stat;
      }),
    };

    this.endGame();
    this.stateService.updateState({ cards, stats });
  }

  endGame() {
    this.stateService.updateState({ isGameStarted: false });
    this.localStorageService.saveHighScore(this.currentState);
    this.timerService.stopTimer();
  }

  resetGame(options: { numberOfCards?: NumberOfCardsOptions } = {}) {
    const { numberOfCards = this.currentNumberOfCards } = options;
    const overlayState = { boardOverlay: { type: 'instructions', show: true } };

    this.timerService.resetTimer();
    this.stateService.resetState();
    this.stateService.updateState(overlayState as Partial<GameState>);
    this.initGame({ numberOfCards });
  }

  setNumberOfCards(numberOfCards: NumberOfCardsOptions) {
    this.resetGame({ numberOfCards });
  }

  handleCardFlip(cardId: number) {
    const { cards } = this.stateService.currentState;
    const updatedCards = this.cardsService.flipCard(cards, cardId);
    const flippedCards = this.cardsService.findFlippedCards(updatedCards);

    if (this.isGameAvailable()) {
      return;
    }

    if (flippedCards.length === 2) {
      this.processFlippedCards(flippedCards, updatedCards);
    } else {
      this.stateService.updateState({
        cards: updatedCards,
        isProcessing: false,
      });
    }
  }

  handleCardMatch({ element }: CardAction): void {
    this.cardsService.triggerGameEffect(element.nativeElement);
  }

  private processFlippedCards(flippedCards: Card[], currentCards: Card[]) {
    if (flippedCards.length !== 2) {
      return;
    }

    this.stateService.updateState({ isProcessing: true });

    if (this.cardsService.checkForMatch(flippedCards[0], flippedCards[1])) {
      this.stateService.updateState({
        cards: this.cardsService.markFlippedAsMatched(currentCards, flippedCards),
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
