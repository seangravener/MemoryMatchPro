import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent {
  @Input() isGameStarted: boolean | undefined;
  @Input() isCheatModeEnabled: boolean | undefined;
  @Input() isGameWon: boolean | undefined;
  @Input() boardOverlayShow: boolean | undefined;
  @Input() showHighScoresButton: boolean | undefined;
  @Input() showInstructionsButton: boolean | undefined;
  @Output() onStartGame = new EventEmitter<void>();
  @Output() onEndGame = new EventEmitter<{ options?: string }>();
  @Output() onWinNow = new EventEmitter<void>();
  @Output() onResetGame = new EventEmitter<void>();
  @Output() onToggleHighScores = new EventEmitter<void>();
  @Output() onToggleInstructions = new EventEmitter<void>();

  startGame() {
    this.onStartGame.emit();
  }

  resetGame() {
    this.onResetGame.emit();
  }

  winNow() {
    this.onWinNow.emit();
  }

  toggleHighScores() {
    this.onToggleHighScores.emit();
  }

  toggleInstructions() {
    this.onToggleInstructions.emit();
  }

  endGame(options: { options?: string } = {}) {
    this.onEndGame.emit(options);
  }
}
