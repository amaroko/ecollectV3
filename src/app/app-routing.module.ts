import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
// Home
import {LoginComponent} from './pages/login/login.component';
import {LayoutComponent} from './pages/layout/layout.component';
import {ActivitylogComponent} from './pages/activitylog/activitylog/activitylog.component';
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
  {
    path: 'activitylog',
    component: ActivitylogComponent,
    children: [
      {path: '', redirectTo: 'notes', pathMatch: 'full'},
      // {path: 'activityhome', component: ActivityhomeComponent},
      {path: 'activitylog', loadChildren: './pages/activitylog/activitylog.module#ActivitylogModule', data: {title: 'Activitylog'}},
      // {path: 'activityaction', component: ActivityActionComponent},
      // {path: 'notes', component: NotesComponent},
      // {path: 'files', component: FilesComponent},
      // {path: 'sms', component: SmsComponent},
      // {path: 'accplan', component: AccPlanComponent},
      // {path: 'contacts', component: CustContactsComponent},
      // {path: 'demandletters', component: DemandLettersComponent},
      // {path: 'remedialcollaterals', component: CollateralsComponent},
      // {path: 'bulknotes', component: BulknotesComponent},
      // {path: 'guarantors', component: GuarantorsComponent},
      // {path: 'editnote', component: EditnoteComponent},
      // {path: 'ptps', component: PtpsComponent},
      // {path: 'writeoffstory', component: WriteoffstoryComponent},
      // { path: 'products', component: ProductsComponent },
      {path: '**', redirectTo: 'notes'}
    ],
    canActivate: [AuthGuard]

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
