import {
  Component,
  HostBinding,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { NavbarService } from '@services/navbar.service';

@Component({
  selector: 'a.navbar__menu__link',
  template: '<ng-content />',
})
export class NavbarMenuLinkComponent {
  private navbarService: NavbarService = inject(NavbarService);

  @HostBinding('attr.color')
  @Input()
  color: string = '';

  @HostListener('click')
  onClick(): void {
    this.navbarService.closeMenu();
  }

  public closeMenu(): void {
    this.navbarService.closeMenu();
  }
}
