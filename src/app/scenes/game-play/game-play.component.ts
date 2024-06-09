import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent implements OnInit {
  themes = Object.keys(Theme).map((key) => ({
    key,
    value: Theme[key as keyof typeof Theme],
  }));

  get currentTheme() {
    return this.themeService.currentTheme;
  }

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.currentTheme$.subscribe((currentTheme) => {
      this.themeService.setTheme(currentTheme);
    });
  }

  changeTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
