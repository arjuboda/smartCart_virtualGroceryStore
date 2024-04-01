// import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/services/user.service';

// interface User {
//   name: string;
//   email: string;
//   address?: string; // Optional property for address
//   phone?: string;   // Optional property for phone
// }

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   user: User = { name: '', email: '' }; // Initialize user object
//   editMode: boolean = false;

//   constructor(private userService: UserService) { }

//   ngOnInit(): void {
//     const token: any = localStorage.getItem('token'); // Retrieve token
//     this.userService.setAuthorizationHeader(token); // Pass token to service
//     this.getUserData();
//   }

//   getUserData() {
//     this.userService.getUserDetails().subscribe({
//       next: (res: any) => {
//         this.user = res;
//       },
//       error: (err: any) => {
//         console.error('Error fetching user details:', err);
//         // Handle error gracefully (e.g., display error message)
//       }
//     });
//   }

//   toggleEditMode() {
//     this.editMode = !this.editMode;
//   }

//   saveChanges() {
//     // Implement logic to update user data on the server
//     // This might involve calling a different method in UserService
//     console.log('Saving user changes:', this.user);
//     // Call update user API (replace with your actual implementation)
//     // this.userService.updateUserDetails(this.user).subscribe(...);
//     this.editMode = false; // Exit edit mode after saving
//   }
// }



// // // export class ProfileComponent implements OnInit {
// // // user: any; // Define a user object
// // //   editMode: boolean = false; // Flag to track edit mode

// // //   constructor() { }

// // //   ngOnInit(): void {
// // //     // Retrieve user data from local storage
// // //     const currentUserData = localStorage.getItem('currentUser');

// // //     // Parse the user data if it exists
// // //     if (currentUserData) {
// // //       this.user = JSON.parse(currentUserData);
// // //     } else {
// // //       console.error('User data not found in local storage.');
// // //     }
// // //   }

// // //   toggleEditMode(): void {
// // //     this.editMode = !this.editMode;
// // //   }

// // //   saveChanges(): void {
// // //     // Save changes to local storage
// // //     localStorage.setItem('currentUser', JSON.stringify(this.user));

// // //     // Update user data in the 'users' array in local storage
// // //     const users = JSON.parse(localStorage.getItem('users') || '[]');
// // //     const index = users.findIndex((u: any) => u.email === this.user.email);
// // //     if (index !== -1) {
// // //       users[index] = this.user;
// // //       localStorage.setItem('users', JSON.stringify(users));
// // //     }

// // //     // Exit edit mode
// // //     this.editMode = false;
// // //   }


import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // user: User = { id: 0, username: '', email: '', user_addresses: [], mobile_number: 0 };
  user: User = { id: 0, email: '', username: '', mobile_number: 0 };
  editMode: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')?.replace(/"/g, ''); // Use optional chaining
    if (token) {
      this.userService.setAuthorizationHeader(token);
    } else {
      console.error('No token found in local storage');
      // Handle the case where no token is available (e.g., redirect to login)
    }
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserDetails().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
        // Handle error gracefully (e.g., display error message)
      }
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    const updatedUserData = {
      "id": this.user.id,
      "username": this.user.username,
      "email": this.user.email,
      "mobile_number": this.user.mobile_number,
      // address: this.user.address // Assuming 'address' is a property within the user object
    };

    this.userService.updateUser(updatedUserData).subscribe({
      next: () => {
        console.log('User data updated successfully!');
        this.getUserData(); // Refresh user data after successful update
        this.editMode = false; // Exit edit mode
      },
      error: (err: any) => {
        console.error('Error updating user:', err);
      }
    });
  }
}
