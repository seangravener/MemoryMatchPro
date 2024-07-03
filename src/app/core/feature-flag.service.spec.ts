/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeatureFlagService } from './feature-flag.service';

describe('Service: FeatureFlag', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureFlagService],
    });
  });

  it('should ...', inject([FeatureFlagService], (service: FeatureFlagService) => {
    expect(service).toBeTruthy();
  }));
});
