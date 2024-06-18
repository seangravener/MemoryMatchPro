import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from '../../core/theme.service';
import { Subscription } from 'rxjs';
import { CheatCodeListenerService } from '../../core/cheat-code-listener.service';
import { GameService } from './game.service';
import { GameStatId } from '../../core/state.model';
import { GameTimerService } from '../../core/game-timer.service';

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

  get currentTheme() {
    return this.themeService.currentTheme;
  }

  get isGameStarted() {
    console.log(this.gameService.isGameStarted )
    return this.gameService.isGameStarted;
  }

  constructor(
    private themeService: ThemeService,
    private gameService: GameService,
    private cheatCodeListenerService: CheatCodeListenerService
  ) {}

  ngOnInit() {
    this.cheatCodeListenerService.init();

    this.subs.add(
      this.themeService.currentTheme$.subscribe((currentTheme) => {
        this.themeService.setTheme(currentTheme);
      })
    );
  }

  changeTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}
