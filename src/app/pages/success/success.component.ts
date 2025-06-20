import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent {
  private router = inject(Router);
  private popupService = inject(PopupService);

  ngOnInit() {
    this.popupService.openPopup('SUCCESS', 'Your order is on the way!');
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
