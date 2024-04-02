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
    const token = localStorage.getItem('token')?.replace(/"/g, ''); // Use optional chaining
    if (token) {
      this.wishlistService.setAuthorizationHeader(token);
      this.cartService.setAuthorizationHeader(token);
    } else {
      console.error('No token found in local storage');
    }
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
    const isAuthenticated = (localStorage.getItem('user_id')) !== null;
    if (!isAuthenticated) {
      alert('Please login first.');
      this.router.navigate(['/login']);
    }

    const wishlistItemPayload = {
      data: {
        product: this.productId,
        user_detail: localStorage.getItem('user_id')
      }
    };

    this.wishlistService.addWishlist(wishlistItemPayload).subscribe(
      () => {
        alert('Product added to Favourite successfully!');
      },
      error => {
        console.error('Error adding product to wishlist:', error);
      }
    );
  }


  addToCart(quantity: number): void {
    //check user login or not
    const isAuthenticated = localStorage.getItem('user_id') !== null;
    if (!isAuthenticated) {
      alert('Please login first.');
      this.router.navigate(['/login']);
    }
    // console.log(this.productId);

    const cartItemPayload = {
      data: {
        product: this.productId,
        quantity: quantity,
        user_detail: localStorage.getItem('user_id')
      }
    };

    this.cartService.addCart(cartItemPayload).subscribe(
      () => {

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