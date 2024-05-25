import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardModule } from './board/board.module';
import { GameComponent } from './game.component';
import { GameService } from './game.service';
import { GameRoutingModule } from './game.routing';
import { SplashPageComponent } from './scenes/splash-page/splash-page.component';

@NgModule({
  declarations: [GameComponent, SplashPageComponent],
  imports: [GameRoutingModule, BoardModule],
  providers: [GameService],
  exports: [GameComponent],
})
export class GameModule {}
