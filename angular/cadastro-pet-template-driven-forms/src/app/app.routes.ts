import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pet-registration',
    loadComponent: () =>
      import('./features/pet-informations/pet-form/pet-form').then((m) => m.PetForm),
  },
  {
    path: 'pet-summary',
    loadComponent: () =>
      import('./features/pet-informations/pet-summary/pet-summary').then((m) => m.PetSummary),
  },
  {
    path: 'playground',
    loadChildren: () => import('./playground/playground.routes').then((m) => m.playgroundRoutes),
  },
  { path: '', redirectTo: 'pet-registration', pathMatch: 'full' },
  { path: '**', redirectTo: 'pet-registration', pathMatch: 'full' },
];
