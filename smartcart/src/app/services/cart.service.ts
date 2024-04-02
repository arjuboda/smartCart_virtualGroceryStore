import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private headers = new HttpHeaders();

  cartURL: string = environment.baseUrl + environment.product_to_cart;
  get_cartItems_Url = environment.baseUrl + environment.get_cart_products;

  constructor(private httpClient: HttpClient) { }
  setAuthorizationHeader(token: string) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set Bearer token header
    });
  }

  addCart(cartProduct: any) {
    return this.httpClient.post(this.cartURL, cartProduct, { headers: this.headers });
  }
  getCart_data() {
    return this.httpClient.get(this.get_cartItems_Url, { headers: this.headers });
  }
  remove_cart_data(id: number) {
    const url = `${this.cartURL}/${id}`;
    return this.httpClient.delete(url, { headers: this.headers });
  }
}