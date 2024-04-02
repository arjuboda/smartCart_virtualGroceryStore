import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showModal: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null && localStorage.getItem('currentUser') !== '';
  }

  showLogoutConfirmation() {
    this.showModal = true;
  }

  cancelLogout() {
    this.showModal = false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    this.showModal = false;
    this.router.navigate(['']); // Redirect to home page after logout
  }

  logoutClicked(event: MouseEvent) {
    event.preventDefault(); // Prevent default link behavior
    this.showLogoutConfirmation(); // Show logout confirmation
  }
}
