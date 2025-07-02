import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  public user: Signal<User | null | undefined> = toSignal(user(this.auth));

  public async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password).then(
      (response: UserCredential) => {
        if (response.user) {
          this.router.navigate(['/']);
        } else {
          console.error('Login failed.');
        }
      }
    );
  }

  public async signOut(): Promise<void> {
    await this.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
