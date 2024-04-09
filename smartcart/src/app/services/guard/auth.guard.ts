import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token') || '';
  const jwtToken = token ? JSON.parse(token) : '' || null;
  return jwtToken
    ? true
    : Inject(Router).createUrlTree(['/login'])
};
