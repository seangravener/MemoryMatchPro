import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameStat } from '../../../../core/state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStatsComponent {
  @Input() currentStats$: Observable<GameStat[]> | undefined;
}
