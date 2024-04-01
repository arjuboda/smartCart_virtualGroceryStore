import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private headers = new HttpHeaders();
  wishlistURL: string = environment.baseUrl + environment.add_product_to_wishlist;
  get_wishlistItems_Url = environment.baseUrl + environment.get_wishlist_products;
  constructor(private httpClient: HttpClient) { }

  setAuthorizationHeader(token: string) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set Bearer token header
    });
  }
  addWishlist(cartProduct: any) {
    return this.httpClient.post(this.wishlistURL, cartProduct, { headers: this.headers });
  }

  getWishlist_data() {
    return this.httpClient.get(this.get_wishlistItems_Url, { headers: this.headers });
  }
  remove_wishlist_data(id: number) {
    const url = `${this.wishlistURL}/${id}`;
    return this.httpClient.delete(url, { headers: this.headers });
  }
}