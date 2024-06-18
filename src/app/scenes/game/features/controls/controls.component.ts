import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {
  get isGameStarted() {
    return this.gameService.isGameStarted;
  }

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  resetGame() {
    this.gameService.resetGame();
    this.gameService.initGame();
  }

  startGame() {
    this.gameService.startGame();
  }

  endGame() {
    this.gameService.endGame();
  }
}
