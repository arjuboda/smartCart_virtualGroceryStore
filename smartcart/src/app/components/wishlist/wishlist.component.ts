import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  wishlistItems: any[] = [];
  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')?.replace(/"/g, ''); // Use optional chaining
    if (token) {
      this.wishlistService.setAuthorizationHeader(token);
    } else {
      console.error('No token found in local storage');
      // Handle the case where no token is available (e.g., redirect to login)
    }
    this.getWishlistProducts();
  }

  getWishlistProducts() {
    this.wishlistService.getWishlist_data().subscribe({
      next: (res: any) => {
        this.wishlistItems = res.data;
        console.log(this.wishlistItems);
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      }
    });
  }

  removeItem(index: number): void {
    const wishlistId = this.wishlistItems[index].id;
    this.wishlistItems.splice(index, 1);
    this.wishlistService.remove_wishlist_data(wishlistId).subscribe({
      next: (res: any) => {
        alert('Item removed from wishlist!')
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);

      }
    });
  }
}

