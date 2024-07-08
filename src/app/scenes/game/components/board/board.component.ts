import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Card } from '../../../../core/state.model';
import { CardAction } from '../card/card.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input() cards: Card[] | undefined | null = [];
  @Input() isCheatModeEnabled = false;
  @Output() onFlip = new EventEmitter<Card>();
  @Output() onMatch = new EventEmitter<CardAction>();
  @Output() onInitGameBoard = new EventEmitter<void>();

  ngOnInit(): void {
    this.onInitGameBoard.emit();
  }

  handleCardFlip(card: Card): void {
    this.onFlip.emit({ ...card });
  }

  handleCardMatch({ ...args }: CardAction): void {
    this.onMatch.emit({ ...args });
  }

  trackByCardId(index: number, card: Card) {
    return card.id ? card.id : null;
  }
}
