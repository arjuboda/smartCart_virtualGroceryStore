import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private headers = new HttpHeaders();

  orderUrl = environment.baseUrl + environment.order_url;

  constructor(private httpClient: HttpClient) { }

  setAuthorizationHeader(token: string) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  placeOrder(orderData: any) {
    return this.httpClient.post(this.orderUrl, orderData, { headers: this.headers });
  }
}
