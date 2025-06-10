import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Admin } from '../../../services/interfaces/auth.interface';
import { AdminUsersTableComponent } from '../../../components/elements/admin-users-table/admin-users-table.component';
import { SpinnerComponent } from '../../../components/elements/spinner/spinner.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [AdminUsersTableComponent, SpinnerComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  private authService = inject(AuthService);

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
}
