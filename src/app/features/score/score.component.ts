import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatsService } from '../../core/stats.service';
import { GameStateService } from '../../core/state.service';
import { GameState } from '../../core/state.model';

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
