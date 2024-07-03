import { Injectable } from '@angular/core';

declare let confetti: any;

export interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
}

const createDefaultGameOptions = () => ({ particleCount: 100, spread: 70 });

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  launchConfetti(overrides?: ConfettiOptions) {
    confetti({
      ...createDefaultGameOptions(),
      ...overrides,
    });
  }

  launchConfettiFromElement(element: HTMLElement, options?: object) {
    const rect = element.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.right) / 2 / window.innerWidth,
      y: (rect.top + rect.bottom) / 2 / window.innerHeight,
    };

    this.launchConfetti({
      origin,
      ...options,
    } as ConfettiOptions);
  }
}
