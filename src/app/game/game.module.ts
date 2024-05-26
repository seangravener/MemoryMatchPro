import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BoardModule } from './components/board/board.module';
import { GameComponent } from './game.component';
import { GameService } from './game.service';
import { GameRoutingModule } from './game.routing';
import { SplashSceneComponent } from './scenes/splash/splash-scene.component';
import { StatsService } from './stats.service';
import { ScoreComponent } from './components/score/score.component';
import { ControlsComponent } from './components/controls/controls.component';
import { BoardComponent } from './components/board/board.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    CardComponent,
    SplashSceneComponent,
    ScoreComponent,
    ControlsComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
  providers: [GameService, StatsService],
  exports: [GameComponent],
})
export class GameModule {}
