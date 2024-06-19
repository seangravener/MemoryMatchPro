import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent {
  @Input() isGameStarted: boolean | undefined;
  @Output() onStartGame = new EventEmitter<void>();
  @Output() onEndGame = new EventEmitter<void>();
  @Output() onResetGame = new EventEmitter<void>();

  resetGame() {
    this.onResetGame.emit();
  }

  startGame() {
    this.onStartGame.emit();
  }

  endGame() {
    this.onEndGame.emit();
  }
}
