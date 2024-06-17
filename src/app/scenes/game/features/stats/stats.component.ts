import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameStatsService } from '../../../../core/stats.service';
import { GameStateService } from '../../../../core/state.service';
import { GameState } from '../../../../core/state.model';
import { map, toArray } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStatsComponent {
  currentStats$ = this.statsService.currentStats$;

  constructor(private statsService: GameStatsService) {}
}
