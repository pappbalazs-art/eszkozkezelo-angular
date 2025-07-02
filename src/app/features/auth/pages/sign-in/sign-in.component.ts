import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'ek-sign-in-page',
  templateUrl: 'sign-in.component.html',
})
export class SignInPageComponent {
  private authService: AuthService = inject(AuthService);

  public signIn(): void {
    this.authService.signInWithEmailAndPassword(
      'hello@pappbalazs.com',
      'Jkmf4227'
    );
  }
}
