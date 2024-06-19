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
import { GameStateService } from '../../../../core/game-state.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnChanges {
  @Output() onFlip = new EventEmitter<void>();
  @Output() onMatch = new EventEmitter<HTMLElement>();

  private _card: Card = {} as Card;
  @Input() set card(card: Card) {
    this._card = card;
  }

  get card() {
    return this._card;
  }

  get isCheatModeEnabled() {
    return this.gameStateService.currentState.isCheatModeEnabled;
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
    private gameStateService: GameStateService
  ) {}

  setGameEffect(element: HTMLElement, options?: object) {
    this.gameEffectsService.launchConfetti({ element, options, delay: 500 });
  }

  ngOnChanges() {
    if (this.card.matched) {
      this.onMatch.emit(this.flipCard.nativeElement);

      // @todo Move to GameService
      this.setGameEffect(this.flipCard.nativeElement);
    }
  }
}
