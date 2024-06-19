import { TestBed } from '@angular/core/testing';
import { ThemeService, Theme } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });

    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with the default theme', () => {
    expect(service.currentTheme).toBe(Theme.Beach);
  });

  it('should return the current theme as observable', (done) => {
    service.currentTheme$.subscribe((theme) => {
      expect(theme).toBe(Theme.Beach);
      done();
    });
  });

  it('should change the theme and apply it to the body', () => {
    spyOn(document.body.classList, 'remove');
    spyOn(document.body.classList, 'add');

    service.setTheme(Theme.Moonlight);

    expect(service.currentTheme).toBe(Theme.Moonlight);
    expect(document.body.classList.remove).toHaveBeenCalledWith(
      ...Object.values(Theme)
    );
    expect(document.body.classList.add).toHaveBeenCalledWith(Theme.Moonlight);
  });

  it('should apply the new theme to the body', () => {
    spyOn(document.body.classList, 'remove');
    spyOn(document.body.classList, 'add');

    service.setTheme(Theme.MidnightPurple);

    expect(document.body.classList.remove).toHaveBeenCalledWith(
      ...Object.values(Theme)
    );
    expect(document.body.classList.add).toHaveBeenCalledWith(
      Theme.MidnightPurple
    );
  });
});
