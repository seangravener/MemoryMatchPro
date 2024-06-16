import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'score-item',
  templateUrl: './score-item.component.html',
  styleUrls: ['./score-item.component.css'],
})
export class ScoreItemComponent implements OnInit {
  @Input() label: string = '';

  private _value: number | string = 0;
  @Input() set value(value: number | string) {
    this._value = value;
  }

  get value(): string {
    return `${this._value}`;
  }

  @HostBinding('class') class =
    'score-item px-4 text-xl text-center w-full md:w-1/4';

  constructor() {}

  ngOnInit() {}
}
