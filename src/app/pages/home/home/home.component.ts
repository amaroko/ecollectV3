import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePageComponent {
  public href = '';

  constructor(private router: Router) {
  }

  OnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }
}
