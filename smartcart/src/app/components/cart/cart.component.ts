
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  currentUser: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Retrieve current user data from local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (!this.currentUser || !this.currentUser.jwt) {
      // If the user is not available, show an alert and redirect to the login page
      alert('You are not logged in. Please login to view your cart.');
      this.router.navigate(['/login']);
    } else {
      // Retrieve cart items from local storage
      const storedCartItems = localStorage.getItem('cartItems');

      if (storedCartItems) {
        this.cartItems = JSON.parse(storedCartItems);
        // Filter cart items based on current user's ID
        this.cartItems = this.cartItems.filter(item => item.jwt === this.currentUser.jwt);
      }

    }
  }

  // Example method to remove an item from the cart
  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
