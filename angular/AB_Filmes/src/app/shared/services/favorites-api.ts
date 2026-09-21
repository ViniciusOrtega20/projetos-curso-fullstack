import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MoviesListResponse} from '../types/movies-list-response';
import {IMovieToFavoriteSuccessResponse} from '../models/movie-to-favorite-success-response';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesApi {
  private readonly _httpClient = inject(HttpClient);

  getFavorites() {
    return this._httpClient.get<MoviesListResponse>(`${environment.baseUrl}/favorites`);
  }

  addMovieToFavorites(movieId: number) {
    return this._httpClient.post<IMovieToFavoriteSuccessResponse>(`${environment.baseUrl}/favorites/${movieId}`, {});
  }

  removeMovieFromFavorites(movieId: number) {
    return this._httpClient.delete<void>(`${environment.baseUrl}/favorites/${movieId}`);
  }

  isMovieInFavorites(movieId: number) {
    return this.getFavorites().pipe(
      map(favorites => favorites.some(movie => movie.id === movieId))
    );
  }

  toggleMovieFavorite(isMovieCurrentFavorite: boolean, movieId: number): Observable<void | IMovieToFavoriteSuccessResponse> {
    return isMovieCurrentFavorite ? this.removeMovieFromFavorites(movieId) : this.addMovieToFavorites(movieId);
  }
}
