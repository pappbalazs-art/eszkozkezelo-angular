import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/auth.guard';
import { NoAuthGuard } from './features/auth/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/home/home.component').then((p) => p.HomePageComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((f) => f.authRoutes),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/categories/categories.routes').then(
        (f) => f.categoriesRoutes
      ),
    canActivate: [AuthGuard],
  },
];
