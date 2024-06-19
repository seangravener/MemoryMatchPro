import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from '../../core/theme.service';
import { Subscription } from 'rxjs';
import { CheatCodeListenerService } from '../../core/cheat-code-listener.service';
import { GameService } from './game.service';
import { Card } from '../../core/state.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  subs: Subscription = new Subscription();

  themes = Object.keys(Theme).map((key) => ({
    key,
    value: Theme[key as keyof typeof Theme],
  }));

  get currentStats$() {
    return this.gameService.currentStats$;
  }

  get currentCards$() {
    return this.gameService.cards$;
  }

  get currentTheme() {
    return this.themeService.currentTheme;
  }

  get isGameStarted() {
    return this.gameService.isGameStarted;
  }

  constructor(
    private themeService: ThemeService,
    private gameService: GameService,
    private cheatCodeListenerService: CheatCodeListenerService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.themeService.currentTheme$.subscribe((currentTheme) => {
        this.themeService.setTheme(currentTheme);
      })
    );
  }

  initGame() {
    this.cheatCodeListenerService.init();
    this.gameService.initGame();
  }

  startGame() {
    this.gameService.startGame();
  }

  endGame() {
    this.gameService.endGame();
  }

  resetGame() {
    this.gameService.resetGame();
  }

  handleOnFlip(card: Card) {
    this.gameService.handleCardFlip(card.id);
  }

  changeTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}
