import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  cards$ = this.gameService.cards$
  gamePlayStatus$ = this.gameService.gamePlayStatus$
  handleCardFlip = this.gameService.handleCardFlip.bind(this.gameService)

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
      this.gameService.initGame()
  }
}
