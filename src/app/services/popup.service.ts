import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  popupVisible = signal(true);
  popupType = signal('');
  popupText = signal('');

  timeout: any;

  openPopup(type: string, text: string) {
    this.popupVisible.set(true);
    this.popupType.set(type);
    this.popupText.set(text);
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.popupVisible.set(false);
      this.popupType.set('');
      this.popupText.set('');
    }, 2000);
  }

  closePopup() {
    this.popupVisible.set(false);
    this.popupType.set('');
    this.popupText.set('');
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}
