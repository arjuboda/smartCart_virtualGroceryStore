import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl: string = environment.baseUrl + environment.login;
  registerUrl: string = environment.baseUrl + environment.register;

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post(
      this.loginUrl,
      credentials
    )
  }
  register(credentials: any) {
    return this.http.post(
      this.registerUrl,
      credentials
    )
  }
}
