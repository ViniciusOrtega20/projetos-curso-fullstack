import {Routes} from '@angular/router';
import {AuthPage} from './features/auth/pages/auth-page/auth-page';
import {RegisterUserForm} from './features/auth/components/register-user-form/register-user-form';
import {LoginForm} from './features/auth/components/login-form/login-form';
import {ExploreMoviesPage} from './features/movies/pages/explore-movies-page/explore-movies-page';
import {FavoriteMoviesPage} from './features/movies/pages/favorite-movies-page/favorite-movies-page';
import {MovieDetailsPage} from './features/movies/pages/movie-details-page/movie-details-page';
import {CreateMoviePage} from './features/movies/pages/create-movie-page/create-movie-page';
import {MainLayout} from './layout/main-layout/main-layout';
import {authGuard} from './core/guard/auth-guard';
import {guestGuard} from './core/guard/guest-guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthPage,
    canActivate: [guestGuard],
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginForm},
      {path: 'register', component: RegisterUserForm},
    ]
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {path: '', redirectTo: 'explore', pathMatch: 'full'},
      {path: 'explore', component: ExploreMoviesPage},
      {path: 'favorites', component: FavoriteMoviesPage},
      {path: 'details/:id', component: MovieDetailsPage},
      {path: 'create', component: CreateMoviePage},
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
