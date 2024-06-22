import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BoardOverlay, Card } from '../../core/state.model';
import { GameService } from './game.service';
import { CardsService } from '../../core/cards.service';
import { StatsService } from '../../core/stats.service';
import { Theme, ThemeKey, ThemeService } from '../../core/theme.service';
import { CheatCodeListenerService } from '../../core/cheat-code-listener.service';
import { GameStateService } from '../../core/game-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  subs: Subscription = new Subscription();
  activeOverlay: 'highScores' | 'instructions' | undefined = 'instructions';
  themes = Object.keys(Theme).map((key) => ({
    key,
    value: Theme[key as ThemeKey],
  }));

  get isCheatModeEnabled() {
    return this.gameStateService.currentState.isCheatModeEnabled;
  }

  get highScores() {
    return this.gameStateService.currentState.highScores;
  }

  get currentState$() {
    return this.gameStateService.currentState$;
  }

  get currentCards$() {
    return this.gameStateService.currentCards$;
  }

  get currentStats$() {
    return this.gameStatsService.currentStats$;
  }

  get currentTheme() {
    return this.themeService.currentTheme;
  }

  get isGameStarted() {
    return this.gameStateService.currentState.isGameStarted;
  }

  constructor(
    private themeService: ThemeService,
    private gameStateService: GameStateService,
    private gameStatsService: StatsService,
    private gameService: GameService,
    private cardsService: CardsService,
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

  toggleHighScores() {
    const { boardOverlay } = this.gameStateService.currentState;
    const show = !boardOverlay.show;

    this.toggleBoardOverlay({ ...boardOverlay, type: 'highScores', show });
  }

  toggleBoardOverlay(boardOverlay: BoardOverlay) {
    console.log('overlay', boardOverlay);
    this.gameStateService.updateGameState({ boardOverlay });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}
