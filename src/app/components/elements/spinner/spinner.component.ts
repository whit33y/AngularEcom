import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('0.4s', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class SpinnerComponent {}
