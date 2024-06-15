import { Component, OnInit } from '@angular/core';
import { GameService } from '../../scenes/game-play/game.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit() {}

  resetGame() {
    console.log('reset game');
    this.gameService.resetGame();
    this.gameService.initGame();
  }

  startGame() {
    console.log('start game');
    this.gameService.initGame();
  }
}
