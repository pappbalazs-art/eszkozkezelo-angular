import { Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { NoAuthGuard } from '@guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@features/home/home.component').then((p) => p.HomePageComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@features/auth/auth.routes').then((f) => f.authRoutes),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('@features/categories/categories.routes').then(
        (f) => f.categoriesRoutes
      ),
    canActivate: [AuthGuard],
  },
];
