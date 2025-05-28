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
import { confirmPasswordValidator } from '../../validators/confirm-password';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, AuthLayoutComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private popupService = inject(PopupService);

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      rePassword: new FormControl('', Validators.required),
    },
    { validators: confirmPasswordValidator }
  );

  navigateTo(route: string) {
    this.router.navigate([`${route}`]);
  }

  error: string = '';
  async register() {
    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;
    try {
      const { data, error } = await this.authService.signUp(email, password);
      if (error) {
        this.error = error.message;
        this.popupService.openPopup('ERROR', this.error);
        console.error(error);
      } else {
        console.log('New user registered: ', email, 'Data: ', data);
      }
    } catch (err) {
      this.error = 'Something went wrong.';
      this.popupService.openPopup('ERROR', this.error);
      console.error('Unexpected error: ', err);
    }
  }
}
