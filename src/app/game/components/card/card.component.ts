import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { Card } from '../../state.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // encapsulation: ViewEncapsulation.None  // Apply styles globally

})
export class CardComponent {
  @Input() card: Card = {} as Card;
  @Output() onFlip = new EventEmitter<void>();

  // Ensure the toggle is controlled by the input state
  @HostBinding('class.is-flipped') get isFlipped() {
    return this.card.flipped;
  }

  constructor() {}

  handleFlip(): void {
    this.onFlip.emit();
  }
}
