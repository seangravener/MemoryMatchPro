/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameTimerService } from './game-timer.service';

describe('Service: GameTimer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameTimerService]
    });
  });

  it('should ...', inject([GameTimerService], (service: GameTimerService) => {
    expect(service).toBeTruthy();
  }));
});
