import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import { Card } from '../../core/state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() card: Card = {} as Card;
  @Output() onFlip = new EventEmitter<void>();
  @HostBinding('class.flip-card') isFlipCard: boolean = true;

  // Ensure the toggle is controlled by the input state
  @HostBinding('class.is-flipped') get isFlipped() {
    return this.card.flipped;
  }

  @HostListener('click') handleFlip() {
    this.onFlip.emit();
  }

  constructor() {}
}
