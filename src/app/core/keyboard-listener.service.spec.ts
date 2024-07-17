/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeyboardListenerService } from './keyboard-listener.service';

describe('Service: CheatCodeListener', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyboardListenerService],
    });
  });

  it('should ...', inject([KeyboardListenerService], (service: KeyboardListenerService) => {
    expect(service).toBeTruthy();
  }));
});
