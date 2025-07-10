import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarService } from '@services/navbar.service';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

import { NavbarLinkComponent } from './navbar-link.component';
import { NoAuthNavbarContentComponent } from '@components/navbar-contents/no-auth-navbar-content.component';

@Component({
  selector: 'nav.navbar__wrapper',
  templateUrl: 'navbar.component.html',
  imports: [
    CommonModule,
    RouterLink,
    NavbarLinkComponent,
    NoAuthNavbarContentComponent,
  ],
})
export class NavbarComponent {
  private navbarService: NavbarService = inject(NavbarService);
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);

  @HostBinding('class.open')
  get isMenuOpenClass() {
    return this.navbarService.isMenuOpen();
  }

  public closeMenu(): void {
    this.navbarService.closeMenu();
  }

  public toggleMenu(): void {
    this.navbarService.toggleMenu();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public isUserAdmin(): boolean {
    return this.userService.getUser()?.role === 'admin';
  }
}
