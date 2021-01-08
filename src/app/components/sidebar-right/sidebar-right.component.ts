import {Component, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import * as global from '../../config/globals';

@Component({
  selector: 'sidebar-right',
  templateUrl: './sidebar-right.component.html'
})

export class SidebarRightComponent {
  global = global;
  @Output() hideMobileRightSidebar = new EventEmitter<boolean>();

  constructor(private eRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMobileRightSidebar.emit(true);
    }
  }
}
