import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, user, User } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private user$: Observable<User | null> = user(this.auth);

  canActivate(): Observable<boolean> {
    return this.user$.pipe(
      map((user: User | null) => {
        if (user) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}
