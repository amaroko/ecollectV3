import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationStart, Router} from '@angular/router';
import pageSettings from './config/page-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  pageSettings;
  // window scroll
  pageHasScroll;

  constructor(private titleService: Title, private router: Router, private renderer: Renderer2) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (window.innerWidth < 768) {
          this.pageSettings.pageMobileSidebarToggled = false;
        }
      }
    });
  }

  ngOnInit() {
    // page settings
    this.pageSettings = pageSettings;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    this.pageHasScroll = top > 0;
    // this.pageHasScroll = top > 0;
  }

}
