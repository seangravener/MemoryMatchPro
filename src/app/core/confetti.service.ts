// src/app/services/confetti.service.ts
import { Injectable } from '@angular/core';

declare var confetti: any;

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  constructor() {}

  launchConfetti(options?: object) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      ...options,
    });
  }

  launchConfettiFromElement(element: HTMLElement, options?: object) {
    const rect = element.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.right) / 2 / window.innerWidth,
      y: (rect.top + rect.bottom) / 2 / window.innerHeight,
    };

    confetti({
      particleCount: 100,
      spread: 70,
      origin: origin,
      ...options,
    });
  }
}
