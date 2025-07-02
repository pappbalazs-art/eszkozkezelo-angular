import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/categories-list/categories-list.component').then(
        (p) => p.CategoriesListPageComponent
      ),
    title: 'Kategóriák',
  },
];
