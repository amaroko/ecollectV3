import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
// Home
import {LoginComponent} from './pages/login/login.component';
import {LayoutComponent} from './pages/layout/layout.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {path: '', redirectTo: 'login', pathMatch: 'full'},
          {path: 'home', loadChildren: './pages/home/home.module#HomeModule', data: {title: 'Home'}},
          {path: 'work', loadChildren: './pages/work/work.module#WorkModule', data: {title: 'Work Queue'}},
          {path: 'reminders', loadChildren: './pages/reminders/reminders.module#RemindersModule', data: {title: 'Reminders'}},
          {path: 'mcoopcash', loadChildren: './pages/mcoopcash/mcoopcash.module#McoopcashModule', data: {title: 'Mcoopcash'}},
          {path: 'creditcards', loadChildren: './pages/creditcards/creditcards.module#CreditcardsModule', data: {title: 'Creditcards'}},
          {path: 'watch', loadChildren: './pages/watch/watch.module#WatchModule', data: {title: 'Watch'}},
        ]
      }
    ]
  },
  {path: 'login', component: LoginComponent, data: {title: 'login'}},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
