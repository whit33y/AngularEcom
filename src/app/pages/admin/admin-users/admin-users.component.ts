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
    this.getUserEmail();
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
        this.adminList.push(data!);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  deleteAdmin(email: string) {
    this.loadingAdminList = true;
    this.adminService.deleteAdmin(email).subscribe({
      next: (data) => {},
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        if (this.currentEmail === email) {
          window.location.reload();
        } else {
          this.getAdminList();
          this.loadingAdminList = false;
        }
      },
    });
  }

  currentEmail: string | null | undefined = '';
  getUserEmail() {
    this.authService
      .getUserEmail()
      .then((data) => {
        this.currentEmail = data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
