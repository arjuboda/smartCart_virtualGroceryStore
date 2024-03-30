import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any; // Define a user object
  editMode: boolean = false; // Flag to track edit mode

  constructor() { }

  ngOnInit(): void {
    // Retrieve user data from local storage
    const currentUserData = localStorage.getItem('currentUser');

    // Parse the user data if it exists
    if (currentUserData) {
      this.user = JSON.parse(currentUserData);
    } else {
      console.error('User data not found in local storage.');
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    // Save changes to local storage
    localStorage.setItem('currentUser', JSON.stringify(this.user));

    // Update user data in the 'users' array in local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === this.user.email);
    if (index !== -1) {
      users[index] = this.user;
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Exit edit mode
    this.editMode = false;
  }
}
