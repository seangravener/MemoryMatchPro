/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TimerService } from './game-timer.service';

describe('Service: GameTimer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimerService]
    });
  });

  it('should ...', inject([TimerService], (service: TimerService) => {
    expect(service).toBeTruthy();
  }));
});
