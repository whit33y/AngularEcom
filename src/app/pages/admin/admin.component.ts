import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    AdminProductsComponent,
    AdminUsersComponent,
    AdminCategoriesComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  selectedRoute = 'users';

  changeRoute(route: string) {
    this.selectedRoute = route;
  }
}
