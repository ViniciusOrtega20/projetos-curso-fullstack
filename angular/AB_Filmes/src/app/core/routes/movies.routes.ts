import {Routes} from '@angular/router';

export const MOVIE_ROUTES: Routes = [
  {path: '', redirectTo: 'explore', pathMatch: 'full'},
  {
    path: 'explore',
    loadComponent: () => import('../../features/movies/pages/explore-movies-page/explore-movies-page').then(m => m.ExploreMoviesPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('../../features/movies/pages/favorite-movies-page/favorite-movies-page').then(m => m.FavoriteMoviesPage)
  },
  {
    path: 'details/:id',
    loadComponent: () => import('../../features/movies/pages/movie-details-page/movie-details-page').then(m => m.MovieDetailsPage)
  },
  {
    path: 'create',
    loadComponent: () => import('../../features/movies/pages/create-movie-page/create-movie-page').then(m => m.CreateMoviePage)
  },
]
