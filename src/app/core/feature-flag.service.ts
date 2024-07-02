import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type FeatureFlagConfig = {
  showHighScores: boolean;
  showInstructions: boolean;
};

type FeatureFlagKey = keyof FeatureFlagConfig;

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private featureFlags = new BehaviorSubject<FeatureFlagConfig>({
    showHighScores: false,
    showInstructions: false,
  });

  get featureFlags$(): Observable<FeatureFlagConfig> {
    return this.featureFlags.asObservable();
  }

  isFeatureEnabled(feature: FeatureFlagKey): boolean {
    return this.featureFlags.getValue()[feature];
  }

  toggleFeature(feature: FeatureFlagKey, isEnabled: boolean) {
    const flags = this.featureFlags.getValue();
    flags[feature] = isEnabled;
    this.featureFlags.next(flags);
  }
}
