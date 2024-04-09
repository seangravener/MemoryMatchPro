import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AngularMemory';
  // cards = this.gameService.cards
  cards$ = this.gameService.cards$
  handleCardFlip = this.gameService.handleCardFlip

  constructor(private gameService: GameService) {

  }

  ngOnInit(): void {
      this.gameService.initGame()
  }
}
