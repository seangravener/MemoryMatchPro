import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardModule } from './board/board.module';
import { GameComponent } from './game.component';
import { GameService } from './game.service';

@NgModule({
  declarations: [GameComponent],
  imports: [BoardModule],
  providers: [GameService],
  exports: [GameComponent],
})
export class GameModule {}
