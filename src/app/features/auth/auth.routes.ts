import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(
        (p) => p.SignInPageComponent
      ),
    title: 'Bejelentkezés',
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.component').then(
        (p) => p.SignUpPageComponent
      ),
    title: 'Regisztráció',
  },
];
