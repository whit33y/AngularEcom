import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  private popupService = inject(PopupService);

  popupVisible = computed(() => this.popupService.popupText());
  popupText = computed(() => this.popupService.popupText());
  popupType = computed(() => this.popupService.popupType());

  closePopup() {
    this.popupService.closePopup();
  }
}
