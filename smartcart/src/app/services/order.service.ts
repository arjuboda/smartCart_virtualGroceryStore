import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  userId: any = localStorage.getItem('user_id');
  private headers = new HttpHeaders();

  orderUrl = environment.baseUrl + environment.order_url;
  get_orderDetails_url = `http://localhost:1337/api/orders?filters[user_detail][id][$eq][0]=${this.userId}&&populate=user_detail`

  constructor(private httpClient: HttpClient) { }

  setAuthorizationHeader(token: string) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  placeOrder(orderData: any) {
    return this.httpClient.post(this.orderUrl, orderData, { headers: this.headers });
  }

  getOrderHistory() {
    return this.httpClient.get(this.get_orderDetails_url, { headers: this.headers });
  }

  // getOrders(): any {
  //   const url = `http://localhost:1337/api/orders?filters[user_detail][id][$eq][0]=${this.userId}`;

  //   return this.httpClient.get<any>(url);
  // }
}
