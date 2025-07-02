import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, user, User } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private user$: Observable<User | null> = user(this.auth);

  canActivate(): Observable<boolean> {
    const currentRoute = this.router.routerState.snapshot.url;
    const currentRouteIsSignIn = currentRoute === '/auth/sign-in';
    const currentRouteIsSignUp = currentRoute === '/auth/sign-up';
    const currentRouteIsAuthRoute =
      currentRouteIsSignIn || currentRouteIsSignUp;

    return this.user$.pipe(
      map((user: User | null) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/auth/sign-in']);
          return false;
        }
      })
    );
  }
}
