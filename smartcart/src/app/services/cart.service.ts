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
    const userId = localStorage.getItem('user_id');
    const url = `http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=${userId}&populate=product&filters[order][id][$notNull]`;
    return this.httpClient.get(url, { headers: this.headers });
  }
  remove_cart_data(id: number) {
    const url = `${this.cartURL}/${id}`;
    return this.httpClient.delete(url, { headers: this.headers });
  }
}


// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment.development';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {
//   constructor(private http: HttpClient) { }

//   cartURL: string = environment.baseUrl + environment.product_to_cart;
//   getCartItems(userId: number) {
//     let url = `http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=${userId}&populate=product&filters[order][id][$notNull]`;

//     return this.http.get<any>(url);
//   }

//   addCart(cartProduct: any) {
//     return this.http.post(this.cartURL, cartProduct);
//   }

//   updateCartItemQuantity(cartItemId: number, quantity: number) {
//     const url = `${this.cartURL}/${cartItemId}`;

//     const body = {
//       data: {
//         quantity: quantity,
//       },
//     };
//     return this.http.put(url, body);
//   }

//   deleteCartItem(cartId: number) {
//     const url = `${this.cartURL}/${cartId}`;

//     return this.http.delete<any>(url);
//   }
// }