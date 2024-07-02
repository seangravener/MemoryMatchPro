import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { ControlsComponent } from './components/controls/controls.component';
import { GameStatsComponent } from './components/stats/stats.component';
import { BoardComponent } from './components/board/board.component';
import { StatItemComponent } from './components/stats/stat-item/stat-item.component';
import { CardComponent } from './components/card/card.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        ControlsComponent,
        GameStatsComponent,
        BoardComponent,
        GameStatsComponent,
        StatItemComponent,
        CardComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
