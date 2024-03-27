// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-page-not-found',
//   templateUrl: './page-not-found.component.html',
//   styleUrls: ['./page-not-found.component.css']
// })
// export class PageNotFoundComponent {

// }

import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  animations: [
    trigger('cartBounce', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'scale(1.2)', opacity: 1 })),
        animate('0.3s ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

