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

import { Card } from '../../core/state.model';
import { ConfettiService } from '../../core/confetti.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnChanges {
  @Output() onFlip = new EventEmitter<void>();
  @Output() onMatch = new EventEmitter<void>();

  private _card: Card = {} as Card;
  @Input() set card(card: Card) {
    this._card = card;
  }

  get card() {
    return this._card;
  }

  @HostBinding('class.flip-card') isFlipCard: boolean = true;

  @HostBinding('class.is-flipped') get isFlipped() {
    return this.card.flipped;
  }

  @HostBinding('class.is-matched') get isMatched() {
    return this.card.matched;
  }

  @HostListener('click') handleFlip() {
    this.onFlip.emit();
  }

  @ViewChild('flipCard') flipCard!: ElementRef<HTMLDivElement>;

  constructor(private confettiService: ConfettiService) {}

  // @todo -- move to VisualEffects service
  queEffect(element: HTMLElement, options?: object) {
    setTimeout(() => {
      this.confettiService.launchConfettiFromElement(element, options);
    }, 500);
  }

  ngOnChanges() {
    if (this.card.matched) {
      this.onMatch.emit();
      this.queEffect(this.flipCard.nativeElement);
    }
  }
}
