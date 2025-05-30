import { Component, computed, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { PopupComponent } from './components/shared/popup/popup.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopupComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  showNavbar = signal(false);
  title = 'syf';

  cartCount = computed(() => this.cartService.cartCount());
  isLoggedIn = computed(() => this.authService.sessionStatus());

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        const currentRoute = this.getCurrentRoute(this.router.routerState.root);
        this.showNavbar.set(currentRoute.snapshot.data['showNavbar']);
        console.log(this.showNavbar());
      });
  }

  private getCurrentRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
