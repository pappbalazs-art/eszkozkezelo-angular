import { Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { NoAuthGuard } from '@guards/no-auth.guard';

import { authRoutes } from '@features/auth/auth.routes';
import { categoriesRoutes } from '@features/categories/categories.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@features/home/home.component').then((p) => p.HomePageComponent),
  },
  {
    path: 'auth',
    children: authRoutes,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'categories',
    children: categoriesRoutes,
    canActivate: [AuthGuard],
  },
];
