import { Component } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  cards$ = this.gameService.cards$;
  handleCardFlip = this.gameService.handleCardFlip.bind(this.gameService);

  demoCard = { flipped: false };

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.initGame();
  }
}
