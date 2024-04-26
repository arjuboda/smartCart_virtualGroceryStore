
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartProductIds: number[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCartProductIds(); // Load cartProductIds from localStorage
    const token = localStorage.getItem('token')?.replace(/"/g, ''); // Use optional chaining
    if (token) {
      this.cartService.setAuthorizationHeader(token);
    } else {
      alert('For cart details first do login!');
      this.router.navigate(['/login'])
    }
    this.getCartProducts();
  }

  loadCartProductIds(): void {
    const storedIds = localStorage.getItem('cartProductIds');
    if (storedIds) {
      this.cartProductIds = JSON.parse(storedIds);
    }
  }

  saveCartProductIds(): void {
    localStorage.setItem('cartProductIds', JSON.stringify(this.cartProductIds));
  }

  getCartProducts() {
    this.cartService.getCart_data().subscribe({
      next: (res: any) => {
        this.cartItems = res.data;
        this.cartProductIds = this.cartItems.map(item => item.attributes.product.data.id);
        // console.log(this.cartItems);
        this.saveCartProductIds(); // Save cartProductIds to localStorage
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      }
    });
  }

  removeItem(index: number): void {
    const productId = this.cartItems[index].attributes.product.data.id; // Get the product ID
    const cartId = this.cartItems[index].id;
    this.cartItems.splice(index, 1);

    // Find the index of the product ID in cartProductIds array
    const productIdIndex = this.cartProductIds.indexOf(productId);
    if (productIdIndex !== -1) {
      // Remove the product ID from cartProductIds array
      this.cartProductIds.splice(productIdIndex, 1);
      this.saveCartProductIds(); // Save updated cartProductIds to localStorage
    }

    this.cartService.remove_cart_data(cartId).subscribe({
      next: (res: any) => {
        alert('Item removed from Cart!');
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
}










