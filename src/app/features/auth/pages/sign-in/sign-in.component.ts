import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

import { CardComponent } from '@components/card/card.component';
import { CardTitleComponent } from '@components/card/card-title.component';
import { CardBodyComponent } from '@components/card/card-body.component';
import { CardFooterComponent } from '@components/card/card-footer.component';
import { InputComponent } from '@components/input/input.component';

@Component({
  selector: 'ek-sign-in-page',
  templateUrl: 'sign-in.component.html',
  imports: [
    CardComponent,
    CardTitleComponent,
    CardBodyComponent,
    CardFooterComponent,
    InputComponent,
  ],
})
export class SignInPageComponent {
  private authService: AuthService = inject(AuthService);

  public email: string = '';
  public password: string = '';

  public signIn(): void {
    console.log(this.email, this.password);
    //this.authService.signInWithEmailAndPassword(this.email, this.password);
  }
}
