import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupComponent } from './components/shared/popup/popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'syf';
  constructor() {}
}
