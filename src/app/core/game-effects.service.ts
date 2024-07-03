import { Injectable } from '@angular/core';
import { ConfettiOptions, ConfettiService } from '../core/confetti.service';

interface SoundEffectOptions {
  soundUrl: string;
  delay?: number;
}

interface GameEffectOptions {
  element: HTMLElement;
  delay?: number;
  options?: ConfettiOptions;
}

@Injectable({
  providedIn: 'root',
})
export class GameEffectsService {
  constructor(private confettiService: ConfettiService) {}

  launchConfetti({ element, delay = 0, options = {} }: GameEffectOptions): this {
    setTimeout(
      () =>
        element
          ? this.confettiService.launchConfettiFromElement(element, options)
          : this.confettiService.launchConfetti(options),
      delay,
    );

    return this;
  }

  playSoundEffect({ soundUrl }: SoundEffectOptions): this {
    new Audio(soundUrl).play();
    return this;
  }
}
