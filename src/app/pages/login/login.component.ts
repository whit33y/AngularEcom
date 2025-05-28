import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/elements/button/button.component';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '../../components/shared/auth-layout/auth-layout.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, AuthLayoutComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private popupService = inject(PopupService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  error: string = '';
  async login() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    try {
      const { data, error } = await this.authService.signIn(email, password);
      if (error) {
        this.error = error.message;
        this.popupService.openPopup('ERROR', this.error);
        console.error(error);
      } else {
        this.popupService.openPopup('SUCCESS', 'Pomyślnie zalogowano');
        console.log('Sucesssfully logged in: ', data);
      }
    } catch (err) {
      this.error = 'Something went wrong.';
      this.popupService.openPopup('ERROR', this.error);
      console.error('Something went wrong:', err);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`${route}`]);
  }
}
