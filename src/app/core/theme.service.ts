import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('theme-beach');
  currentTheme$ = this.themeSubject.asObservable();

  get currentTheme() {
    return this.themeSubject.getValue();
  }

  setTheme(theme: string) {
    this.themeSubject.next(theme);
  }
}
