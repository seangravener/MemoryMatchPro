import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { GameState } from '../../../../core/state.model';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent {
  @Input() isGameStarted: boolean | undefined;
  @Input() currentState$: Observable<GameState> | undefined;
  @Output() onStartGame = new EventEmitter<void>();
  @Output() onEndGame = new EventEmitter<void>();
  @Output() onResetGame = new EventEmitter<void>();
  @Output() onToggleHighScores = new EventEmitter<void>();
  @Output() onToggleInstructions = new EventEmitter<void>();

  startGame() {
    this.onStartGame.emit();
  }

  resetGame() {
    this.onResetGame.emit();
  }

  toggleHighScores() {
    this.onToggleHighScores.emit();
  }

  toggleInstructions() {
    this.onToggleInstructions.emit();
  }

  endGame() {
    this.onEndGame.emit();
  }
}
