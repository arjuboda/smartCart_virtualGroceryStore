import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  wishlistURL: string = environment.baseUrl + environment.product_to_wishlist;

  constructor(private http: HttpClient) { }

  addWishlist(cartProduct: any) {
    return this.http.post(this.wishlistURL, cartProduct);
  }
}