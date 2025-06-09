import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { SuccessComponent } from './pages/success/success.component';
import { CancelComponent } from './pages/cancel/cancel.component';
import { AdminComponent } from './pages/admin/admin.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    component: RegisterComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { showNavbar: true },
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: { showNavbar: true },
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    data: { showNavbar: true },
  },
  {
    path: 'success',
    component: SuccessComponent,
    data: { showNavbar: true },
  },
  {
    path: 'cancel',
    component: CancelComponent,
    data: { showNavbar: true },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    data: { showNavbar: true },
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
