import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/models/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  login_url: string = environment.baseUrl + environment.login;
  userDetails: string = environment.baseUrl + environment.user_detail;
  updateUserDetails: string = environment.baseUrl + environment.update_user;
  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) { }

  setAuthorizationHeader(token: string) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set Bearer token header
    });
  }

  getUserDetails() {
    return this.httpClient.get(this.userDetails, { headers: this.headers });
  }
  updateUser(user: User): any {
    const userId = user.id; // Extract user ID from the User object
    const url = `${this.updateUserDetails}/${userId}`; // Construct the full URL with user ID
    console.log('finle url', url);
    console.log('data will pass as body', user);
    return this.httpClient.put(url, user, { headers: this.headers });
  }
}
