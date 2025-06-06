import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.css',
})
export class CancelComponent {
  private router = inject(Router);
  private popupService = inject(PopupService);

  ngOnInit() {
    this.popupService.openPopup('ERROR', 'Something went wrong!');
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
