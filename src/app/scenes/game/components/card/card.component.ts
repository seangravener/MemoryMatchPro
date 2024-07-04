import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';

import { Card } from '../../../../core/state.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnChanges {
  @ViewChild('cardElement') cardElement!: ElementRef<HTMLElement>;
  @Input() card: Card = {} as Card;
  @Input() isCheatModeEnabled: boolean = false;
  @Output() onFlip = new EventEmitter<void>();
  @Output() onMatch = new EventEmitter<{ card: Card; element: ElementRef<HTMLElement> }>();

  @HostBinding('class.flip-card') isFlipCard: boolean = true;
  @HostBinding('class.card-element') isCardElement: boolean = true;

  @HostBinding('class.is-flipped') get isFlipped() {
    return this.card.flipped;
  }

  @HostBinding('class.is-matched') get isMatched() {
    return this.card.matched;
  }

  @HostListener('click') handleFlip() {
    this.onFlip.emit();
  }

  @ViewChild('flipCard') flipCard!: ElementRef<HTMLElement>;

  ngOnChanges() {
    if (this.card && this.card.matched && this.card.flipped && !this.isCheatModeEnabled) {
      this.onMatch.emit({ card: this.card, element: this.flipCard });
    }
  }
}
