import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from '../../core/theme.service';
import { Subscription } from 'rxjs';
import { CheatCodeListenerService } from '../../core/cheat-code-listener.service';

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

  constructor(
    private themeService: ThemeService,
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
