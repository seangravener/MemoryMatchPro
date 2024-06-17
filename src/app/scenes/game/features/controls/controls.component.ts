import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {
  // get isTimerStarted() {
  //   return this.gameService.isTimerStarted();
  // }

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  resetGame() {
    this.gameService.resetGame();
    this.gameService.initGame();
  }

  startGame() {
    // this.gameService.initGame();
  }
}
