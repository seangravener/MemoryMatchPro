import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Card } from '../../core/state.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() card: Card = {} as Card;
  @Output() onFlip = new EventEmitter<void>();
  @HostBinding('class.flip-card') isFlipCard: boolean = true;

  // Ensure the toggle is controlled by the input state
  @HostBinding('class.is-flipped') get isFlipped() {
    return this.card.flipped;
  }

  @HostBinding('class.is-matched') get isMatched() {
    return this.card.matched;
  }

  @HostListener('click') handleFlip() {
    this.onFlip.emit();
  }

  constructor() {}
}
