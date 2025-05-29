import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: 'cart',
    canActivate: [guestGuard],
    component: CartComponent,
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    component: RegisterComponent,
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    component: LoginComponent,
  },
  {
    path: 'products',
    canActivate: [guestGuard],
    component: ProductsComponent,
  },
  {
    path: 'products/:id',
    canActivate: [guestGuard],
    component: ProductDetailsComponent,
  },
  {
    path: '**',
    component: ProductsComponent,
  },
];
