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

  addToCartClicked: boolean = false;
  addToWishlistClicked: boolean = false;
  isInCart: boolean = false;
  isInWishlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private location: Location
  ) { }

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

      this.getProductById(this.productId);
    });
    this.checkIfInCart();
    this.checkIfInWhishlist();

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
  checkIfInWhishlist() {
    const productId: number = this.productId;
    console.log(productId)
    this.isInWishlist = this.wishlistService.wishlistProductIds.includes(productId);
    console.log("cartid:", this.wishlistService.wishlistProductIds);
    console.log(this.isInWishlist)
  }
  addToWishlist(): void {
    if (this.isInWishlist) {
      alert('Product is already in the cart.');
      return; // Exit function if product is already in the cart
    }

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
        // Add the newly added product ID to cartProductIds
        this.wishlistService.wishlistProductIds.push(this.productId);
        alert('Product added to Favourite successfully!');
        this.isInWishlist = true; // Update isInCart flag
      },
      error => {
        console.error('Error adding product to wishlist:', error);
      }
    );
    this.addToWishlistClicked = true;

  }

  checkIfInCart() {
    const productId: number = this.productId;
    console.log(productId)
    this.isInCart = this.cartService.cartProductIds.includes(productId);
    console.log("cartid:", this.cartService.cartProductIds);
    console.log(this.isInCart)
  }
  addToCart(quantity: number): void {
    if (this.isInCart) {
      alert('Product is already in the cart.');
      return; // Exit function if product is already in the cart
    }
    //check user login or not
    const isAuthenticated = localStorage.getItem('user_id') !== null;
    if (!isAuthenticated) {
      alert('Please login first.');
      this.router.navigate(['/login']);
    }

    const cartItemPayload = {
      data: {
        product: this.productId,
        quantity: quantity,
        user_detail: localStorage.getItem('user_id')
      }
    };

    this.cartService.addCart(cartItemPayload).subscribe(
      () => {
        // Add the newly added product ID to cartProductIds
        this.cartService.cartProductIds.push(this.productId);
        // console.log("id added in cart", this.cartService.cartProductIds);
        this.isInCart = true; // Update isInCart flag
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