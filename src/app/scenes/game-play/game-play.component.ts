import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent implements OnInit {
  get currentTheme(){
    return this.themeService.currentTheme;
  }

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.currentTheme$.subscribe((currentTheme) => {
      this.applyTheme();
    });
  }

  changeTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  applyTheme() {
    const body = document.body;
    body.classList.remove('theme-beach', 'theme-midnight-purple', 'theme-moonlight');
    body.classList.add(this.currentTheme);
  }
}
