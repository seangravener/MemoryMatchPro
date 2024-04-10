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
  matchesFound = 0;
  moveCount = 0;
  gameStarted = false;

  cardsSubject: BehaviorSubject<Card[]> = new BehaviorSubject([{} as Card]);
  cards$ = this.cardsSubject.asObservable();

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

  handleCardFlip(cardId: number) {
    const currentCard =
      this.cards.find((card) => card.id === cardId) || ({} as Card);

    console.log('cardId', cardId);
    console.log('initial currentCard state:', currentCard);
    if (!this.gameStarted || currentCard.flipped) {
      console.log('card is already face up!');
      return;
    }

    let newCards = [...this.cards];
    const flippedCards = newCards.filter(
      (card) => card.flipped && !card.matched
    );

    if (flippedCards.length < 2) {
      newCards = newCards.map((card) => {
        return card.id === cardId ? { ...card, flipped: true } : card;
      });
      this.moveCount++;
    }

    console.log('flipped: ', flippedCards);
    console.log('updated currentCard state:', newCards.find((card) => card.id === cardId) || ({} as Card));
    this.cards = [...newCards]
    this.cardsSubject.next([...newCards]);


    if (flippedCards.length === 1) {
      // const matchFound = this.checkForMatch(
      //   newCards.find((card) => card.id === cardIndex) || ({} as Card),
      //   flippedCards[0]
      // );

      const matchFound = false;
      if (!matchFound) {
        setTimeout(() => {
          // flip cards back over
          // flippedCards[0].flipped = false;
          // newCards[cardIndex].flipped = false;
          // this.cardsSubject.next([...this.cards, ...flippedCards, ...newCards]);
        }, 500);
      }
    }
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
