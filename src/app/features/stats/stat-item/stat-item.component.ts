import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { GameStat } from '../../../core/state.model';

@Component({
  selector: 'stat-item',
  templateUrl: './stat-item.component.html',
  styleUrls: ['./stat-item.component.css'],
})
export class StatItemComponent {
  private _stat: GameStat = { id: '', label: '', value: 0 };
  @Input() set stat(stat: GameStat) {
    this._stat = stat;
  }

  get stat(): GameStat {
    return this._stat;
  }

  get value(): string {
    return `${this.stat.value}`;
  }

  get label(): string {
    return this.stat.label;
  }

  @HostBinding('class') class =
    'score-item px-4 text-xl text-center w-full md:w-1/4';
}
