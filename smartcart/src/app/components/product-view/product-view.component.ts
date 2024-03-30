import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  productId!: number;
  product: any;
  products: any[] = [];
  currentUser: any; // Variable to store current user data

  constructor(private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Get product ID from URL
      this.products = history.state.products; // Retrieve products array from state
      console.log(this.products);
      // Call a method to fetch the product details based on the ID
      this.getProductDetails();
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(this.currentUser)
  }

  getProductDetails() {
    // Find the product with the matching ID in the products array
    this.product = this.products.find(product => product.id === this.productId);
  }

  addToCart(product: any) {
    // Check if current user data is present
    if (this.currentUser) {
      console.log('Product added to cart:', product);
      // Add user ID to product data
      product.userId = this.currentUser.id;
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      cartItems.push(product);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    else {
      console.log('User not logged in. Redirect to login or register page.');
      // alert('first login yourself');
      this.router.navigate(['/login']);
    }
  }


  addToWishlist(product: any) {
    // Check if current user data is present
    if (this.currentUser && this.currentUser.email) {
      console.log('Product added to wishlist:', product);
      // Add user ID to product data
      product.userId = this.currentUser.id;
      const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
      wishlistItems.push(product);
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
    else {
      console.log('User not logged in. Redirect to login or register page.');
      // alert('first login yourself');
      this.router.navigate(['/login']);
    }
  }

  goBack() {

    this.location.back(); // Go back to the previous page
  }
}
