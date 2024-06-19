import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  readonly numberOfCardsOptions = [8, 16, 24, 32, 40];

  getNumberOfCards(defaultIndex: number = 2): number {
    return this.numberOfCardsOptions[defaultIndex];
  }
}
