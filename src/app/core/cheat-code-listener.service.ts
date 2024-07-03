import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class CheatCodeListenerService {
  private currentComboCode: string[] = environment.cheatCodeCombo;
  private currentInput: string[] = [];
  private isInitialized = false;

  constructor(private stateService: StateService) {}

  init(): void {
    if (this.isInitialized) {
      return;
    }

    this.listenForKeyPresses();
    this.isInitialized = true;
  }

  private listenForKeyPresses(): void {
    const { isCheatModeEnabled } = this.stateService.currentState;
    if (isCheatModeEnabled) {
      return;
    }

    document.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeyPress(event));
  }

  private handleKeyPress(event: KeyboardEvent): void {
    const { isCheatModeEnabled } = this.stateService.currentState;
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
    return this.currentInput.toString().includes(this.currentComboCode.toString());
  }

  private toggleCheatModeAndResetInput(): void {
    this.stateService.toggleCheatMode();
    this.currentInput = [];
  }
}
