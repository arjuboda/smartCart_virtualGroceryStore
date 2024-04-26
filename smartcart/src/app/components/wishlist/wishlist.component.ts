import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})


export class WishlistComponent implements OnInit {
  wishlistItems: any[] = [];
  wishlistProductIds: number[] = [];

  constructor(
    private wishlistService: WishlistService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')?.replace(/"/g, ''); // Use optional chaining
    if (token) {
      this.wishlistService.setAuthorizationHeader(token);
    } else {
      alert('For wishlist details first do login!');
      this.router.navigate(['/login'])
    }
    this.getWishlistProducts();
  }

  loadWishlistProductIds(): void {
    const storedIds = localStorage.getItem('wishlistProductIds');
    if (storedIds) {
      this.wishlistProductIds = JSON.parse(storedIds);
    }
  }

  saveWishlistProductIds(): void {
    localStorage.setItem('wishlistProductIds', JSON.stringify(this.wishlistProductIds));
  }

  getWishlistProducts() {
    this.wishlistService.getWishlist_data().subscribe({
      next: (res: any) => {
        this.wishlistItems = res.data;
        // console.log(this.wishlistItems);
        this.wishlistProductIds = this.wishlistItems.map(item => item.attributes.product.data.id);
        this.saveWishlistProductIds(); // Save cartProductIds to localStorage

      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      }
    });
  }

  removeItem(index: number): void {
    const productId = this.wishlistItems[index].attributes.product.data.id; // Get the product ID
    const wishlistId = this.wishlistItems[index].id;
    this.wishlistItems.splice(index, 1);

    // Find the index of the product ID in cartProductIds array
    const productIdIndex = this.wishlistProductIds.indexOf(productId);
    if (productIdIndex !== -1) {
      // Remove the product ID from cartProductIds array
      this.wishlistProductIds.splice(productIdIndex, 1);
      this.saveWishlistProductIds(); // Save updated cartProductIds to localStorage
    }

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

