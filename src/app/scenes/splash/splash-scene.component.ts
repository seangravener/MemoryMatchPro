import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-splash-scene',
  templateUrl: './splash-scene.component.html',
  // styleUrl: './game.component.scss'
})
export class SplashSceneComponent implements OnInit {
  get currentTheme() {
    return this.themeService.currentTheme;
  }

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.setTheme(this.currentTheme);
  }
}
