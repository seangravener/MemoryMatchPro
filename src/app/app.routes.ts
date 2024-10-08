import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashSceneComponent } from './scenes/splash/splash-scene.component';

export const routes: Routes = [
  {
    path: '',
    component: SplashSceneComponent,
    pathMatch: 'full',
  },
  {
    path: 'game',
    loadChildren: () => import('./scenes/game/game.module').then(m => m.GameModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
