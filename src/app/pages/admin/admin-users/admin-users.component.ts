import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Admin } from '../../../services/interfaces/auth.interface';
import { AdminUsersTableComponent } from '../../../components/elements/admin-users-table/admin-users-table.component';
import { SpinnerComponent } from '../../../components/elements/spinner/spinner.component';
import { AdminService } from '../../../services/admin.service';
import { AdminUsersFormComponent } from '../../../components/elements/admin-users-form/admin-users-form.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    AdminUsersTableComponent,
    SpinnerComponent,
    AdminUsersFormComponent,
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  private authService = inject(AuthService);
  private adminService = inject(AdminService);

  loadingAdminList = false;
  adminList: Admin[] = [];
  ngOnInit() {
    this.getAdminList();
  }

  getAdminList() {
    this.loadingAdminList = true;
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.adminList = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loadingAdminList = false;
      },
    });
  }

  addAdmin(email: string) {
    this.adminService.addAdmin(email).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.getAdminList();
      },
    });
  }

  deleteAdmin(email: string) {
    this.adminService.deleteAdmin(email).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.getAdminList();
      },
    });
  }
}
