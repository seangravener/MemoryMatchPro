import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Theme {
  Beach = 'theme-beach',
  MidnightPurple = 'theme-midnight-purple',
  Moonlight = 'theme-moonlight',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>(Theme.Beach);
  currentTheme$ = this.themeSubject.asObservable();

  get currentTheme() {
    return this.themeSubject.getValue();
  }

  setTheme(theme: Theme) {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme) {
    const body = document.body;
    body.classList.remove(...Object.values(Theme));
    body.classList.add(theme);
  }
}
