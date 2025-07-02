import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

import { CardComponent } from '@components/card/card.component';
import { CardTitleComponent } from '@components/card/card-title.component';
import { CardBodyComponent } from '@components/card/card-body.component';
import { CardFooterComponent } from '@components/card/card-footer.component';

@Component({
  selector: 'ek-sign-in-page',
  templateUrl: 'sign-in.component.html',
  imports: [
    CardComponent,
    CardTitleComponent,
    CardBodyComponent,
    CardFooterComponent,
  ],
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
