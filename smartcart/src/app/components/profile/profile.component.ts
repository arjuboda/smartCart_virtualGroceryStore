import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = { id: 0, email: '', username: '', mobile_number: 0 };
  editMode: boolean = false;
  orders: any = [];
  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')?.replace(/"/g, ''); // Use optional chaining
    if (token) {
      this.userService.setAuthorizationHeader(token);
      this.orderService.setAuthorizationHeader(token);
    } else {
      console.error('No token found in local storage');
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

  getOrderHistory() {
    this.orderService.getOrderHistory().subscribe({
      next: (res: any) => {
        // Extract orders from the data array
        const orders = res.data.map((item: any) => item.attributes);

        // Store orders separately without adding them to the user object
        this.orders = orders;
      },
      error: (err: any) => {
        console.error('Error fetching order history:', err);
        // Handle error gracefully (e.g., display error message)
      }
    });
    // this.orderService.getOrders().subscribe(
    //   (response: { data: any }) => {
    //     this.orders = response.data;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching orders:', error);
    //   }
    // );
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
