import { Injectable } from '@angular/core';
import { GameService } from '../scenes/game/game.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheatCodeListenerService {
  private currentComboCode: string[] = environment.cheatCodeCombo;
  private currentInput: string[] = [];
  private isInitialized = false;

  constructor(private gameService: GameService) {}

  init(): void {
    if (this.isInitialized) {
      return;
    }

    this.listenForKeyPresses();
    this.isInitialized = true;
  }

  private listenForKeyPresses(): void {
    const { isCheatModeEnabled } = this.gameService.currentState;
    if (isCheatModeEnabled) {
      return;
    }

    document.addEventListener('keydown', (event: KeyboardEvent) =>
      this.handleKeyPress(event)
    );
  }

  private handleKeyPress(event: KeyboardEvent): void {
    const { isCheatModeEnabled } = this.gameService.currentState;
    const key = event.key.toLowerCase();

    if (key === 'escape' && isCheatModeEnabled) {
      this.toggleCheatModeAndResetInput();
      return;
    }

    this.currentInput.push(key);

    if (this.isCheatCodeEntered()) {
      this.toggleCheatModeAndResetInput();
    } else if (this.currentInput.length >= this.currentComboCode.length) {
      this.currentInput.shift();
    }
  }

  private isCheatCodeEntered(): boolean {
    return this.currentInput
      .toString()
      .includes(this.currentComboCode.toString());
  }

  private toggleCheatModeAndResetInput(): void {
    this.gameService.toggleCheatMode();
    this.currentInput = [];
  }
}
