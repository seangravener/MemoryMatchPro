/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfettiService } from './confetti.service';

describe('Service: Confetti', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfettiService]
    });
  });

  it('should ...', inject([ConfettiService], (service: ConfettiService) => {
    expect(service).toBeTruthy();
  }));
});
