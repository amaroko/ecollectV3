// Core Module
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule, Title} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSortModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
// Main Component
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SidebarRightComponent} from './components/sidebar-right/sidebar-right.component';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {FooterComponent} from './components/footer/footer.component';
import {PanelModule} from './components/panel/panel.module';
import {FloatSubMenuComponent} from './components/float-sub-menu/float-sub-menu.component';
// Component Module
import {AgmCoreModule} from '@agm/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TrendModule} from 'ngx-trend';
import {CountdownModule} from 'ngx-countdown';
import {ChartsModule} from 'ng4-charts/ng4-charts';
import {TagInputModule} from 'ngx-chips';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {Ng2TableModule} from 'ngx-datatable/ng2-table';
import {NvD3Module} from 'ng2-nvd3';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import 'd3';
import 'nvd3';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// Pages
// import {HomePageComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {LayoutComponent} from './pages/layout/layout.component';
import '@ag-grid-enterprise/all-modules';
import {AgGridModule} from '@ag-grid-community/angular';
import {filter, map} from 'rxjs/operators';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {ActivitylogComponent} from './pages/activitylog/activitylog.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    FloatSubMenuComponent,

    // HomePageComponent,

    LoginComponent,

    LayoutComponent,
    ActivitylogComponent




  ],
  imports: [
    AppRoutingModule,
    NgxSkeletonLoaderModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyC5gJ5x8Yw7qP_DqvNq3IdZi2WUSiDjskk'}),
    BrowserAnimationsModule,
    BrowserModule,
    AgGridModule.withComponents([]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountdownModule,
    ChartsModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    PanelModule,
    LoadingBarRouterModule,
    MatSortModule,
    MatTableModule,
    NgbModule,
    NvD3Module,
    NgxChartsModule,
    Ng2TableModule,
    NgxDaterangepickerMd.forRoot(),
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    TagInputModule,
    TrendModule
  ],
  providers: [Title, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private routee: ActivatedRoute) {
    // router.events.subscribe((e) => {
    //   if (e instanceof NavigationEnd) {
    //     const title = 'E-collect | ' + this.route.snapshot.firstChild.data['title'];
    //     this.titleService.setTitle(title);
    //   }

    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.routee.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data['title']) {
          return 'E-collect | ' + child.snapshot.data['title'];
        }
        return appTitle;
      })
    ).subscribe((ttl: string) => {
      this.titleService.setTitle(ttl);
    });
  }
}
