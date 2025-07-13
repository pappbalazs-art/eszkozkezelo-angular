import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InitialsPipe } from 'app/core/pipes/initials.pipe';

import { NavbarMenuLinkComponent } from '@components/navbar/navbar-menu-link.component';
import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { DropdownTriggerComponent } from '@components/dropdown/dropdown-trigger.component';
import { SettingsIconComponent } from '@components/icons/settings-icon.component';
import { SignOutIconComponent } from '@components/icons/sign-out-icon.component';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { User } from '@interfaces/user';

@Component({
  selector: 'div.navbar__nav--user',
  templateUrl: 'user-navbar-content.component.html',
  imports: [
    RouterLink,
    InitialsPipe,
    NavbarMenuLinkComponent,
    DropdownComponent,
    DropdownTriggerComponent,
    SettingsIconComponent,
    SignOutIconComponent,
  ],
})
export class UserNavbarContentComponent {
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);

  public user(): User {
    // We return an empty object as "User" if there are no users for simply
    // clean up the code.
    // There is no chance for that this component is shown and there is no
    // user returned by the User Service.
    return this.userService.getUser() || ({} as User);
  }

  public signOut(): void {
    this.authService.signOut();
  }
}
