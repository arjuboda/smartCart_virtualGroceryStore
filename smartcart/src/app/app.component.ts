import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smartcart';
  navs = [
    {
      name: 'Login',
      path: 'login'
    },
    {
      name: 'Home',
      path: 'home'
    },
  ];
  constructor(private router: Router) { }
}
;