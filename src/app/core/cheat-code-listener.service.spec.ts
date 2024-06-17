/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheatCodeListenerService } from './cheat-code-listener.service';

describe('Service: CheatCodeListener', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheatCodeListenerService]
    });
  });

  it('should ...', inject([CheatCodeListenerService], (service: CheatCodeListenerService) => {
    expect(service).toBeTruthy();
  }));
});
