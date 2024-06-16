import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game.routing';
import { GameService } from './game.service';
import { GameStatsService } from '../../core/stats.service';

import { GamePlayComponent } from './game-play.component';
import { ScoreComponent } from '../../features/score/score.component';
import { ControlsComponent } from '../../features/controls/controls.component';
import { BoardComponent } from '../../features/board/board.component';
import { CardComponent } from '../../features/card/card.component';
import { ThemeService } from '../../core/theme.service';
import { ScoreItemComponent } from '../../features/score/score-item/score-item.component';

@NgModule({
  declarations: [
    GamePlayComponent,
    BoardComponent,
    CardComponent,
    ScoreComponent,
    ScoreItemComponent,
    ControlsComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
  providers: [GameService, GameStatsService, ThemeService],
  exports: [GamePlayComponent],
})
export class GameModule {}
