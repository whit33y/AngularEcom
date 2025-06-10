import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() cartCount?: number;
  @Input() isLoggedIn?: boolean;
  @Input() isAdmin?: boolean;
  @Output() emitAuth = new EventEmitter<string>();
  @Output() emitCart = new EventEmitter<string>();
  @Output() emitAdmin = new EventEmitter<string>();
  @Output() emitHome = new EventEmitter<boolean>();
}
