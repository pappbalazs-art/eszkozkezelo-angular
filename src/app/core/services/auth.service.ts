import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from '@firebase/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  public user: Signal<User | null | undefined> = toSignal(user(this.auth));

  constructor() {
    this.auth.onAuthStateChanged((user: User | null) => {
      this.userService.fetchUser(user?.uid);

      if (user) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/sign-in']);
      }
    });
  }

  public isAuthenticated(): boolean {
    return Boolean(this.auth.currentUser);
  }

  public async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password).then(
      (response: UserCredential) => {
        if (!response.user) {
          console.error('Login failed.');
        }
      }
    );
  }

  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}
