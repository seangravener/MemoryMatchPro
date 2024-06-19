import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Card } from '../../../../core/state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input() currentCards$: Observable<Card[]> | undefined;
  @Output() onFlip = new EventEmitter<Card>();
  @Output() onInitGameBoard = new EventEmitter<void>();

  ngOnInit(): void {
    this.onInitGameBoard.emit();
  }

  handleCardFlip(card: Card): void {
    this.onFlip.emit(card);
  }

  trackByCardId(index: number, card: Card): any {
    return card.id;
  }
}
