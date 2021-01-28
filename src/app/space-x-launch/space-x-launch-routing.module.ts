import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpaceXLaunchComponent } from './space-x-launch/space-x-launch.component';

const routes: Routes = [
  {
    path: '',
    component: SpaceXLaunchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpaceXLaunchRoutingModule { }
