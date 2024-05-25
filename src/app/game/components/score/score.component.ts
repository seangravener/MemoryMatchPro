import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatsService } from '../../stats.service';
import { GameStateService } from '../../state.service';
import { GameState } from '../../state.model';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent {
  gameState$ = this.gameStateService.gameState$;

  constructor(private gameStateService: GameStateService) {}
}
