import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from '../../game.component';
import { ControlsComponent } from '../controls/controls.component';
import { GameStatsComponent } from '../stats/stats.component';
import { BoardComponent } from './board.component';
import { StatItemComponent } from '../stats/stat-item/stat-item.component';
import { CardComponent } from '../card/card.component';
import { Card } from '../../../../core/state.model';

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

  it('should set cards input correctly', () => {
    const boardComponent = fixture.debugElement.children[0].componentInstance as BoardComponent;
    const testCards: Card[] = [{ id: 1 }, { id: 2 }] as Card[];

    boardComponent.cards = testCards;
    fixture.detectChanges();

    expect(boardComponent.cards).toEqual(testCards);
  });
});
