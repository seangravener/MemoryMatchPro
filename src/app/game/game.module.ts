import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardModule } from './components/board/board.module';
import { GameComponent } from './game.component';
import { GameService } from './game.service';
import { GameRoutingModule } from './game.routing';
import { SplashSceneComponent } from './scenes/splash/splash-scene.component';
import { StatsService } from './stats.service';

@NgModule({
  declarations: [GameComponent, SplashSceneComponent],
  imports: [GameRoutingModule, BoardModule],
  providers: [GameService, StatsService],
  exports: [GameComponent],
})
export class GameModule {}
