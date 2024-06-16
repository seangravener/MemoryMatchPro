/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameStatsService } from './stats.service';

describe('Service: Stats', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameStatsService]
    });
  });

  it('should ...', inject([GameStatsService], (service: GameStatsService) => {
    expect(service).toBeTruthy();
  }));
});
