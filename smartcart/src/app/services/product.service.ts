import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
// import { Observable } from 'rxjs'; // Import Observable
// import { Products } from '../models/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product_url: string = environment.baseUrl + environment.product_detail;

  constructor(private http: HttpClient) { }


  getProducts() {
    return this.http.get(this.product_url);
  }

  getProductById(id: number) {
    const url = `${environment.baseUrl}${environment.product_by_id.replace('id', id.toString())}`;
    return this.http.get(url);
  }
}
