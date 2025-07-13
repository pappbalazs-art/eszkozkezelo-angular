import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CategoriesIconComponent } from '@components/icons/categories-icon.component';
import { HomeIconComponent } from '@components/icons/home-icon.component';
import { ItemsIconComponent } from '@components/icons/items-icon.component';
import { ReservationsIconComponent } from '@components/icons/reservations-icon.component';
import { UsersIconComponent } from '@components/icons/users-icon.component';

@Component({
  selector: 'nav.sidebar__wrapper',
  templateUrl: 'sidebar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    HomeIconComponent,
    CategoriesIconComponent,
    ItemsIconComponent,
    ReservationsIconComponent,
    UsersIconComponent,
  ],
})
export class SidebarComponent {}
