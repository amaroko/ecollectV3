import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {PanelModule} from '../../components/panel/panel.module';


const routes: Routes = [
  // {path: '', redirectTo: 'home'},
  {path: '', component: HomePageComponent},
];


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), PanelModule,
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule {
}
