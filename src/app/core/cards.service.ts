import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { Card } from './state.model';
import { emojiSet } from '../config/emojiSet';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private gameState: GameStateService) {}

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
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    return shuffledCards;
  }

  flipAllCards(flipped: boolean) {
    const { cards } = this.gameState.currentState;
    this.gameState.updateGameState({
      cards: cards.map((card: Card) => ({
        ...card,
        flipped: flipped || !card.flipped,
      })),
    });
  }

  peekCards(duration: number, delay: number, callback?: () => void) {
    timer(delay).subscribe(() => {
      this.flipAllCards(true);
      timer(duration).subscribe(() => {
        this.flipAllCards(false);
        if (callback) {
          callback();
        }
      });
    });
  }

  flipCard(cards: Card[], cardId: number): Card[] {
    return cards.map((card) =>
      card.id === cardId && !card.flipped ? { ...card, flipped: true } : card
    );
  }

  findFlippedCards(cards: Card[]): Card[] {
    return cards.filter((card) => card.flipped && !card.matched);
  }

  markFlippedAsMatched(currentCards: Card[], flippedCards: Card[]): Card[] {
    const isFlippedCard = (card: Card) =>
      flippedCards.some((flippedCard) => flippedCard.id === card.id);
    const updateCardProperties = (card: Card, props: Partial<Card>): Card => {
      if (isFlippedCard(card)) {
        return { ...card, ...props };
      }
      return card;
    };

    const updatedCards = currentCards.map((card) =>
      updateCardProperties(card, { matched: false })
    );

    setTimeout(() => {
      this.gameState.updateGameState({
        cards: updatedCards.map((card) =>
          updateCardProperties(card, { matched: true })
        ),
      });
    }, 400);

    return updatedCards;
  }

  resetFlippedCardsAfterDelay(flippedCards: Card[], updatedCards: Card[], delay = 1000) {
    setTimeout(() => {
      const cards = updatedCards.map((card) =>
        flippedCards.find((fc) => fc.id === card.id)
          ? { ...card, flipped: false }
          : card
      );

      this.gameState.updateGameState({ cards, isProcessing: false });
    }, delay);
  }

  checkForMatch(card1: Card, card2: Card) {
    return card1.imageContent === card2.imageContent;
  }
}
