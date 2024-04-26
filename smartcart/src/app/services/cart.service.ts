import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private headers = new HttpHeaders();
  public cartProductIds: number[];

  cartURL: string = environment.baseUrl + environment.product_to_cart;
  get_cartItems_Url = environment.baseUrl + environment.get_cart_products;

  constructor(private httpClient: HttpClient) {
    // Initialize cartProductIds from local storage or empty array if null
    const storedCartProductIds = localStorage.getItem('cartProductIds');
    this.cartProductIds = storedCartProductIds ? JSON.parse(storedCartProductIds) : [];

  }

  setAuthorizationHeader(token: string) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set Bearer token header
    });
  }

  addCart(cartProduct: any) {
    return this.httpClient.post(this.cartURL, cartProduct, { headers: this.headers }).pipe(
      tap(() => {
        // Update cartProductIds in local storage after successful addition
        this.cartProductIds.push(cartProduct.data.product);
        localStorage.setItem('cartProductIds', JSON.stringify(this.cartProductIds));
      })
    );
  }
  getCart_data() {
    const userId = localStorage.getItem('user_id');
    const url = `http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=${userId}&populate=product&filters[order][id][$notNull]`;
    return this.httpClient.get(url, { headers: this.headers });
  }
  remove_cart_data(id: number) {
    const url = `${this.cartURL}/${id}`;
    return this.httpClient.delete(url, { headers: this.headers });
  }
  getCartProductIds(): number[] {
    return this.cartProductIds;
  }
}

