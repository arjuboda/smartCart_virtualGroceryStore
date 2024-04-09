import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { authGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'product-view',
    component: ProductViewComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'product-view/:id',
    component: ProductViewComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'checkout',
    component: CheckOutComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
