import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarLinkComponent } from '@components/navbar/navbar-link.component';
import { NavbarMenuLinkComponent } from '@components/navbar/navbar-menu-link.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'div.navbar__nav--no-auth',
  templateUrl: 'no-auth-navbar-content.component.html',
  imports: [
    RouterLink,
    NavbarLinkComponent,
    NavbarMenuLinkComponent,
    ButtonComponent,
  ],
})
export class NoAuthNavbarContentComponent {}
