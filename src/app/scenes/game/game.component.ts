import { Component, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { BoardOverlay, Card } from '../../core/state.model';
import { GameService } from './game.service';
import { GameStateService } from '../../core/game-state.service';
import { StatsService } from '../../core/stats.service';
import { Theme, ThemeKey, ThemeService } from '../../core/theme.service';
import { KeyboardListenerService } from '../../core/keyboard-listener.service';
import { FeatureFlagService } from '../../core/feature-flag.service';
import { CardAction } from './components/card/card.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  subs: Subscription = new Subscription();
  activeOverlay: 'highScores' | 'instructions' | undefined = 'instructions';
  themes = Object.keys(Theme).map(key => ({
    key,
    value: Theme[key as ThemeKey],
  }));

  get isCheatModeEnabled() {
    return this.gameStateService.currentState.isCheatModeEnabled;
  }

  set isCheatModeEnabled(isEnabled: boolean) {
    this.gameStateService.updateGameState({ isCheatModeEnabled: isEnabled });
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

  get currentTheme$() {
    return this.themeService.currentTheme$;
  }

  get currentTheme() {
    return this.themeService.currentTheme;
  }

  get isGameStarted() {
    return this.gameStateService.currentState.isGameStarted;
  }

  get isGameWon() {
    return this.gameService.isGameWon;
  }

  get featureFlags$() {
    return this.featureFlagService.featureFlags$;
  }

  constructor(
    private themeService: ThemeService,
    private gameStateService: GameStateService,
    private gameStatsService: StatsService,
    private gameService: GameService,
    private featureFlagService: FeatureFlagService,
    private keyboardListenerService: KeyboardListenerService,
  ) {}

  ngOnInit() {
    this.themeService.setTheme(this.currentTheme);
  }

  initGame() {
    this.keyboardListenerService.init();
    this.gameService.initGame();
    this.toggleBoardOverlay({ type: 'instructions', show: true });
  }

  startGame() {
    this.gameService.startGame();
  }

  winNow() {
    this.isCheatModeEnabled = false;
    this.gameService.winGame();
  }

  endGame() {
    this.gameService.endGame();
    this.toggleBoardOverlay({ type: 'instructions', show: true });
  }

  resetGame() {
    this.gameService.resetGame();
    this.toggleBoardOverlay({ type: 'instructions', show: true });
  }

  handleCardFlip(card: Card) {
    this.gameService.handleCardFlip(card.id);
  }

  handleCardMatch({ card, element }: CardAction): void {
    this.gameService.handleCardMatch({ card, element });
  }

  changeTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  toggleHighScores() {
    const { boardOverlay } = this.gameStateService.currentState;
    const show = !boardOverlay.show;

    this.toggleBoardOverlay({ ...boardOverlay, type: 'highScores', show });
  }

  toggleInstructions() {
    const { boardOverlay } = this.gameStateService.currentState;
    const show = !boardOverlay.show;

    this.toggleBoardOverlay({ ...boardOverlay, type: 'instructions', show });
  }

  toggleBoardOverlay(boardOverlay: BoardOverlay) {
    this.gameStateService.updateGameState({ boardOverlay });
  }

  toggleCheatMode() {
    this.isCheatModeEnabled = !this.isCheatModeEnabled;
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}
