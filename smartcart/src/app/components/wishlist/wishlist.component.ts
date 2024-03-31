import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  wishlistItems: any[] = [];
  currentUser: any; // Variable to store current user data

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Retrieve current user data from local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(this.currentUser);
    if (!this.currentUser || !this.currentUser.jwt) {
      // If the user is not available, show an alert and redirect to the login page
      alert('You are not logged in. Please login to view your wishlist.');
      this.router.navigate(['/login']);
    } else {

      // Retrieve wishlist items from local storage
      const storedWishlistItems = localStorage.getItem('wishlistItems');
      if (storedWishlistItems) {
        this.wishlistItems = JSON.parse(storedWishlistItems);
        // Filter wishlist items based on current user's ID
        this.wishlistItems = this.wishlistItems.filter(item => item.jwt === this.currentUser.jwt);
      }
    }

  }
  // Example method to remove an item from the wishlist
  removeItem(index: number): void {
    this.wishlistItems.splice(index, 1);
    localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
  }
}



