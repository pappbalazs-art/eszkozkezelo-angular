import { Component, HostListener, inject } from '@angular/core';
import { NavbarService } from '@services/navbar.service';

@Component({
  selector: 'a.navbar__link',
  template: '<ng-content />',
})
export class NavbarLinkComponent {
  private navbarService: NavbarService = inject(NavbarService);

  @HostListener('click')
  onClick(): void {
    this.navbarService.closeMenu();
  }

  public closeMenu(): void {
    this.navbarService.closeMenu();
  }
}
