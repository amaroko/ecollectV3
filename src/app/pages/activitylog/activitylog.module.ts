import {NgModule} from '@angular/core';
import {ActivityhomeComponent} from './activityhome/activityhome.component';
import {RouterModule, Routes} from '@angular/router';
import {PanelModule} from '../../components/panel/panel.module';
import { NotesComponent } from './notes/notes.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: '', component: NotesComponent},
  ];

@NgModule({
  declarations: [ActivityhomeComponent, NotesComponent],
  imports: [
    PanelModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivitylogModule {

}
