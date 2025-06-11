import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Admin } from '../../../services/interfaces/auth.interface';

@Component({
  selector: 'app-admin-users-table',
  standalone: true,
  imports: [],
  templateUrl: './admin-users-table.component.html',
  styleUrl: './admin-users-table.component.css',
})
export class AdminUsersTableComponent {
  @Input() adminList?: Admin[];
  @Output() emitMail = new EventEmitter<string>();
}
