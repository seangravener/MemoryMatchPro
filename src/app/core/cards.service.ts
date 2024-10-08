import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { Card } from './state.model';
import { emojiSet } from '../config/emojiSet';
import { GameStateService } from './game-state.service';
import { GameEffectsService } from './game-effects.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  get currentCards(): Card[] {
    return this.gameStateService.currentState.cards;
  }

  constructor(
    private gameStateService: GameStateService,
    private gameEffectsService: GameEffectsService,
  ) {}

  createCards(numberOfCards: number): Card[] {
    const getRandomSample = (array: any[], n: number) => {
      const sampled = [];
      const currentArray = [...array];

      for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * currentArray.length);
        sampled.push(currentArray[randomIndex]);
        currentArray.splice(randomIndex, 1);
      }

      return sampled;
    };

    const cardsWithEmojis: Card[] = [];
    const initCard = { flipped: false, matched: false };
    const emojiSetSample = getRandomSample(emojiSet, numberOfCards / 2);
    emojiSetSample.concat(emojiSetSample).forEach((emoji, index) => {
      cardsWithEmojis.push({ ...initCard, id: index, imageContent: emoji });
    });

    return cardsWithEmojis;
  }

  shuffleCards(cards: Card[]): Card[] {
    let shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    return shuffledCards;
  }

  flipCardsAll(flipped: boolean) {
    const { cards } = this.gameStateService.currentState;
    this.gameStateService.updateGameState({
      cards: cards.map((card: Card) => ({
        ...card,
        flipped: flipped || !card.flipped,
      })),
    });
  }

  flipCard(cards: Card[], cardId: number): Card[] {
    return cards.map(card =>
      card.id === cardId && !card.flipped ? { ...card, flipped: true } : card,
    );
  }

  findFlippedCards(cards: Card[]): Card[] {
    return cards.filter(card => card.flipped && !card.matched);
  }

  resetFlippedCardsAfterDelay(flippedCards: Card[], updatedCards: Card[], delay = 1000) {
    setTimeout(() => {
      const cards = updatedCards.map(card =>
        flippedCards.find(fc => fc.id === card.id) ? { ...card, flipped: false } : card,
      );

      this.gameStateService.updateGameState({ cards, isProcessing: false });
    }, delay);
  }

  markFlippedAsMatched(currentCards: Card[], flippedCards: Card[]): Card[] {
    const isFlippedCard = (card: Card) =>
      flippedCards.some(flippedCard => flippedCard.id === card.id);
    const updateCardProperties = (card: Card, props: Partial<Card>): Card => {
      if (isFlippedCard(card)) {
        return { ...card, ...props };
      }
      return card;
    };

    const updatedCards = currentCards.map(card => updateCardProperties(card, { matched: false }));

    setTimeout(() => {
      this.gameStateService.updateGameState({
        cards: updatedCards.map(card => updateCardProperties(card, { matched: true })),
      });
    }, 400);

    return updatedCards;
  }

  checkForMatch(card1: Card, card2: Card) {
    return card1.imageContent === card2.imageContent;
  }

  peekCards(duration: number, delay: number, callback?: () => void) {
    timer(delay).subscribe(() => {
      this.flipCardsAll(true);
      timer(duration).subscribe(() => {
        this.flipCardsAll(false);
        if (callback) {
          callback();
        }
      });
    });
  }

  triggerGameEffect(element: HTMLElement, options?: object) {
    // keep a list of elements already triggered to prevent multiple triggers
    // onGameWon, launch confetti for all cards (check status of isGameWon)

    this.gameEffectsService.launchConfetti({ element, options, delay: 500 });
  }
}
