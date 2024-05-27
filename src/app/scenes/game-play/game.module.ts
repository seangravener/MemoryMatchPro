import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game.routing';
import { GameService } from './game.service';
import { StatsService } from '../../core/stats.service';

import { GamePlayComponent } from './game-play.component';
import { ScoreComponent } from '../../features/score/score.component';
import { ControlsComponent } from '../../features/controls/controls.component';
import { BoardComponent } from '../../features/board/board.component';
import { CardComponent } from '../../features/card/card.component';

@NgModule({
  declarations: [
    GamePlayComponent,
    BoardComponent,
    CardComponent,
    ScoreComponent,
    ControlsComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
  providers: [GameService, StatsService],
  exports: [GamePlayComponent],
})
export class GameModule {}
