import { Component, ViewEncapsulation } from '@angular/core';
import { GameService } from '../../game.service';
import { Card } from '../../../../core/state.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  // encapsulation: ViewEncapsulation.None
})
export class BoardComponent {
  cards$ = this.gameService.cards$;
  handleCardFlip = this.gameService.handleCardFlip.bind(this.gameService);

  demoCard = { flipped: false };

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.initGame();
  }

  trackByCardId(index: number, card: Card): any {
    return card.id;
  }
}
