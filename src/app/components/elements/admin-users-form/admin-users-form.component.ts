import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-users-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-users-form.component.html',
  styleUrl: './admin-users-form.component.css',
})
export class AdminUsersFormComponent {
  @Output() emitMail = new EventEmitter<string>();
  adminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}
