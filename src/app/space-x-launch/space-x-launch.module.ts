import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceXLaunchRoutingModule } from './space-x-launch-routing.module';
import { ComponentsModule } from '../common/components/components.module';
import { FilterComponent } from './filter/filter.component';
import { SpaceXLaunchComponent } from './space-x-launch/space-x-launch.component';
import { SpacexResultComponent } from './spacex-result/spacex-result.component';


@NgModule({
  declarations: [FilterComponent, SpaceXLaunchComponent, SpacexResultComponent],
  imports: [
    CommonModule,
    SpaceXLaunchRoutingModule,
    ComponentsModule,
  ],
  exports: [
    ComponentsModule,
  ]
})
export class SpaceXLaunchModule { }
