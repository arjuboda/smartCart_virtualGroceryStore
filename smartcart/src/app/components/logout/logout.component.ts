import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  showModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.showModal = true;
  }

  logout() {
    // localStorage.removeItem('user_id');
    // localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.showModal = false;
  }

  cancel() {
    this.showModal = false;
  }

}
