import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'section.section.section--sign-in',
  templateUrl: 'sign-in.component.html',
  imports: [InputComponent, ButtonComponent],
})
export class SignInPageComponent {
  private authService: AuthService = inject(AuthService);

  public email: string = '';
  public password: string = '';
  public isLoading: boolean = false;

  public isFormValid(): boolean {
    return Boolean(this.email && this.password);
  }

  public signIn($event: SubmitEvent): void {
    $event.preventDefault();

    this.isLoading = true;
    this.authService.signInWithEmailAndPassword(this.email, this.password);
  }
}
