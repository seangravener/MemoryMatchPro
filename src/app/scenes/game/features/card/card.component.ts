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
import { ConfettiService } from '../../../../core/confetti.service';
import { GameEffectsService } from '../../../../core/game-effects.service';

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

  constructor(
    private gameEffectsService: GameEffectsService,
  ) {}

  setGameEffect(element: HTMLElement, options?: object) {
    this.gameEffectsService.launchConfetti({ element, options, delay: 500 });
  }

  ngOnChanges() {
    if (this.card.matched) {
      this.onMatch.emit();
      this.setGameEffect(this.flipCard.nativeElement);
    }
  }
}
