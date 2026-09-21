import {Routes} from '@angular/router';
import {AuthPage} from './features/auth/pages/auth-page/auth-page';
import {MainLayout} from './layout/main-layout/main-layout';
import {authGuard} from './core/guard/auth-guard';
import {guestGuard} from './core/guard/guest-guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthPage,
    canActivate: [guestGuard],
    loadChildren: () => import('./core/routes/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    loadChildren: () => import('./core/routes/movies.routes').then(m => m.MOVIE_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
