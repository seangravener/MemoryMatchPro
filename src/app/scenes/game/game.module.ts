import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game.routing';
import { GameService } from './game.service';
import { StatsService } from '../../core/stats.service';

import { GameComponent } from './game.component';
import { GameStatsComponent } from './components/stats/stats.component';
import { ControlsComponent } from './components/controls/controls.component';
import { BoardComponent } from './components/board/board.component';
import { CardComponent } from './components/card/card.component';
import { ThemeService } from '../../core/theme.service';
import { StatItemComponent } from './components/stats/stat-item/stat-item.component';

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    CardComponent,
    GameStatsComponent,
    StatItemComponent,
    ControlsComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
  providers: [GameService, StatsService, ThemeService],
  exports: [GameComponent],
})
export class GameModule {}
