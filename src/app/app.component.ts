import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

import { SpinnerComponent } from '@components/spinner/spinner.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';

@Component({
  selector: 'div.wrapper',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    RouterOutlet,
    SpinnerComponent,
    NavbarComponent,
    SidebarComponent,
  ],
})
export class AppComponent {
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);

  public isReady(): boolean {
    return this.userService.isReady();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public isUserAdmin(): boolean {
    return this.userService.getUser()?.role === 'admin';
  }
}
