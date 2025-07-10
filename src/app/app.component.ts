import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

import { SpinnerComponent } from '@components/spinner/spinner.component';
import { NavbarComponent } from '@components/navbar/navbar.component';

@Component({
  selector: 'div.wrapper',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, SpinnerComponent, NavbarComponent],
})
export class AppComponent {
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);

  public isReady(): boolean {
    return this.userService.isReady();
  }
}
