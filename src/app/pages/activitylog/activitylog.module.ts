import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivitylogComponent} from './activitylog/activitylog.component';
import {ActivityhomeComponent} from './activitylog/activityhome/activityhome.component';
import {RouterModule, Routes} from '@angular/router';
import {PanelModule} from '../../components/panel/panel.module';

const routes: Routes = [
  {path: '', redirectTo: 'notes'},
  {path: 'activityhome', component: ActivityhomeComponent}
];

@NgModule({
  declarations: [ActivitylogComponent, ActivityhomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PanelModule,
  ],
  exports: [
    RouterModule
  ]
})
export class ActivitylogModule {
}
