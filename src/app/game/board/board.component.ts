import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  cards$ = this.gameService.cards$
  gamePlayStatus$ = this.gameService.gamePlayStatus$
  handleCardFlip = this.gameService.handleCardFlip.bind(this.gameService)

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
      this.gameService.initGame()
  }
}
