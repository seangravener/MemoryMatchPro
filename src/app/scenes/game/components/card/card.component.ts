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
import { GameEffectsService } from '../../../../core/game-effects.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnChanges {
  @Input() card: Card = {} as Card;
  @Input() isCheatModeEnabled: boolean = false;
  @Output() onFlip = new EventEmitter<void>();
  @Output() onMatch = new EventEmitter<HTMLElement>();

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

  constructor(private gameEffectsService: GameEffectsService) {}

  setGameEffect(element: HTMLElement, options?: object) {
    this.gameEffectsService.launchConfetti({ element, options, delay: 500 });
  }

  ngOnChanges() {
    // @todo Move to GameService
    // @todo narrow down the scope of the effect
    if (this.card.matched && this.card.flipped && !this.isCheatModeEnabled) {
      this.onMatch.emit(this.flipCard.nativeElement);
      this.setGameEffect(this.flipCard.nativeElement);
    }
  }
}
