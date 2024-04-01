
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')?.replace(/"/g, ''); // Use optional chaining
    if (token) {
      this.cartService.setAuthorizationHeader(token);
    } else {
      console.error('No token found in local storage');
      // Handle the case where no token is available (e.g., redirect to login)
    }
    this.getWishlistProducts();
  }

  getWishlistProducts() {
    this.cartService.getCart_data().subscribe({
      next: (res: any) => {
        this.cartItems = res.data;
        console.log(this.cartItems);
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      }
    });
  }

  removeItem(index: number): void {
    const cartId = this.cartItems[index].id;
    this.cartItems.splice(index, 1);
    this.cartService.remove_cart_data(cartId).subscribe({
      next: (res: any) => {
        alert('Item removed from Cart!')
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);

      }
    });
  }
}
