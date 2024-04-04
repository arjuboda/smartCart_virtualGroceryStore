
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
    this.getCartProducts();
  }

  getCartProducts() {
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


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { CartService } from 'src/app/services/cart.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css'],
// })
// export class CartComponent {
//   isLoggedIn = false;
//   userId = 0;

//   constructor(
//     private router: Router,
//     private auth: AuthService,
//     private cartService: CartService
//   ) { }

//   ngOnInit() {
//     this.userId = this.auth.getUserId();
//     // this.isLoggedIn = this.auth.getAuthStatus();
//     this.getCartItems(this.userId);
//   }

//   ngOnDestroy() {
//     if (this.redirect) {
//       return;
//     }
//     let updatedCart = this.updateCartQuantity();

//     updatedCart.forEach((item) => {
//       this.cartService
//         .updateCartItemQuantity(item.id, item.quantity)
//         .subscribe({
//           next: (response) => { },
//           error: (err) => {
//             console.error(`Error updating cart item ${item.id}:`, err);
//           },
//         });
//     });
//   }

//   redirect = false;
//   placeOrder() {
//     let updatedCart = this.updateCartQuantity();

//     updatedCart.forEach((item) => {
//       this.cartService
//         .updateCartItemQuantity(item.id, item.quantity)
//         .subscribe({
//           next: (response) => {
//             this.redirect = true;
//             this.router.navigate(['/order']);
//           },
//           error: (err) => {
//             console.error(`Error updating cart item ${item.id}:`, err);
//           },
//         });
//     });
//   }

//   updateCartQuantity() {
//     return this.cartItems.map((item) => {
//       return {
//         id: item.id,
//         quantity: item.attributes.quantity,
//       };
//     });
//   }

//   cartItems: any[] = [];

//   getCartItems(userId: any) {
//     this.cartService.getCartItems(userId).subscribe({
//       next: (response) => {
//         this.cartItems = response.data;

//         this.getGrandTotal();
//       },
//       error: (error) => {
//         console.error('Error fetching cart items:', error);
//       },
//     });
//   }

//   grandTotal = 0;

//   getGrandTotal() {
//     this.grandTotal = this.cartItems.reduce((prev, cur) => {
//       return (
//         prev +
//         cur.attributes.product.data.attributes.price * cur.attributes.quantity
//       );
//     }, 0);
//   }

//   incrementQuantity(index: any) {
//     index.attributes.quantity++;
//     this.getGrandTotal();
//   }

//   decrementQuantity(index: any) {
//     if (index.attributes.quantity <= 1) {
//       return;
//     }
//     index.attributes.quantity--;
//     this.getGrandTotal();
//   }
//   removeCartItem(cartId: number) {
//     if (!confirm('Are you sure you want to delete this item?')) {
//       return;
//     }

//     this.cartItems = this.cartItems.filter((item) => item.id !== cartId);

//     this.cartService.deleteCartItem(cartId).subscribe({
//       next: (response) => {
//         this.getGrandTotal();
//       },
//       error: (error) => {
//         console.error('Error deleting cart item:', error);
//       },
//     });
//   }
// }









