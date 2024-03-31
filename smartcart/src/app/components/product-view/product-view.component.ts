// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Location } from '@angular/common';
// import { CartService } from 'src/app/services/cart.service';
// import { ProductService } from 'src/app/services/product.service';
// import { WishlistService } from 'src/app/services/wishlist.service';

// @Component({
//   selector: 'app-product-view',
//   templateUrl: './product-view.component.html',
//   styleUrls: ['./product-view.component.css']
// })
// export class ProductViewComponent implements OnInit {
//   productId!: number;
//   product: any;
//   products: any[] = [];
//   currentUser: any; // Variable to store current user data

//   constructor(private route: ActivatedRoute, private location: Location, private router: Router) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.productId = +params['id']; // Get product ID from URL
//       this.products = history.state.products; // Retrieve products array from state
//       console.log(this.products);
//       // Call a method to fetch the product details based on the ID
//       this.getProductDetails();
//     });
//     this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//     console.log(this.currentUser)
//   }

//   getProductDetails() {
//     // Find the product with the matching ID in the products array
//     this.product = this.products.find(product => product.id === this.productId);
//   }

//   addToCart(product: any) {
//     // Check if current user data is present
//     if (this.currentUser && this.currentUser.jwt) {
//       console.log('Product added to cart:', product);
//       // Add user ID to product data
//       product.jwt = this.currentUser.jwt;
//       const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
//       cartItems.push(product);
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }
//     else {
//       console.log('User not logged in. Redirect to login or register page.');
//       // alert('first login yourself');
//       this.router.navigate(['/login']);
//     }
//   }


//   addToWishlist(product: any) {
//     // Check if current user data is present
//     if (this.currentUser && this.currentUser.jwt) {
//       console.log('Product added to wishlist:', product);
//       // Add user ID to product data
//       product.jwt = this.currentUser.jwt;
//       const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
//       // console.log(product);
//       wishlistItems.push(product);
//       localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
//     }
//     else {
//       console.log('User not logged in. Redirect to login or register page.');
//       // alert('first login yourself');
//       this.router.navigate(['/login']);
//     }
//   }

//   goBack() {

//     this.location.back(); // Go back to the previous page
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  productId: number = 0;
  product: any = {};
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService, private location: Location,) { }

  ngOnInit(): void {
    // Get the product ID from the route parameter
    // const userData: any = localStorage.getItem('currentUser');
    // const userId = userData.user.id;
    this.route.params.subscribe(params => {
      this.productId = +params['id'];

      // Fetch the product details based on the ID
      this.getProductById(this.productId);
    });
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.product = response.data.attributes;
        console.log(response);
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  addToWishlist(): void {
    const isAuthenticated = ('localStorage.getItem(user_id)') !== null;
    if (!isAuthenticated) {
      alert('Please login first.');
      return;
    }

    const wishlistItemPayload = {
      data: {
        product: this.productId,
        user_detail: localStorage.getItem('localStorage.getItem(user_id)')
      }
    };


    this.wishlistService.addWishlist(wishlistItemPayload).subscribe(
      () => {
        // console.log('Cart Item:', cartItem);

        // Successfully added to cart, update local storage or UI as needed
        alert('Product added to Favourite successfully!');
      },
      error => {
        console.error('Error adding product to wishlist:', error);
        // Handle error as needed
      }
    );
  }


  addToCart(quantity: number): void {
    //check user login or not
    const isAuthenticated = localStorage.getItem('user_id') !== null;
    if (!isAuthenticated) {
      alert('Please login first.');
      return;
    }
    console.log(this.productId);

    const cartItemPayload = {
      data: {
        product: this.productId,
        quantity: quantity,
        user_detail: localStorage.getItem('user_id')
      }
    };


    this.cartService.addCart(cartItemPayload).subscribe(
      () => {
        // console.log('Cart Item:', cartItem);

        // Successfully added to cart, update local storage or UI as needed
        alert('Product added to cart successfully!');
      },
      error => {
        console.error('Error adding product to cart:', error);
        // Handle error as needed
      }
    );
  }
  goBack() {
    this.location.back();
  }
}