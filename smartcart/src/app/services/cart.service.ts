import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartURL: string = environment.baseUrl + environment.product_to_cart;

  constructor(private http: HttpClient) { }

  addCart(cartProduct: any) {
    return this.http.post(this.cartURL, cartProduct);
  }
}