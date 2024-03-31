// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class InterceptorInterceptor implements HttpInterceptor {

//   constructor() { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     let _jwtToken: any = ""
//     console.log('localStorage.getItem(LocalStorageKeys.token): ', localStorage.getItem('token'));
//     const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
//     if (token) {
//       _jwtToken = JSON.parse(
//         token || ''
//       ) || "";
//     }
//     console.log('_jwtToken: ', _jwtToken);
//     const authReq = request.clone({
//       headers: request.headers.set('Authorization', `Bearer ${_jwtToken}`),
//     });
//     return next.handle(request);
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let _jwtToken: any = '';

    console.log(
      'localStorage.getItem(LocalStorageKeys.token): ',
      localStorage.getItem('token')
    );

    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';

    if (token) {
      _jwtToken = JSON.parse(token || '') || '';
    }
    console.log('_jwtToken: ', _jwtToken);
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${_jwtToken}`),
    });

    return next.handle(authReq);
  }
}