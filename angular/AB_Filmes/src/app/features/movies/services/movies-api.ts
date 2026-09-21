import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MoviesListResponse} from '../../../shared/types/movies-list-response';
import {IMovieResponse} from '../../../shared/models/movie-response';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesApi {
  private readonly _httpClient = inject(HttpClient);

  getMovies() {
    return this._httpClient.get<MoviesListResponse>(environment.baseUrl + '/movies');
  }

  getMovieDetails(id: number) {
    return this._httpClient.get<IMovieResponse>(`${environment.baseUrl}/movies/${id}`);
  }

  setRateMovie(id: number, rating: number) {
    return this._httpClient.post<IMovieResponse>(`${environment.baseUrl}/movies/${id}/rate`, {rating});
  }

  createMovie(movieData: FormData) {
    return this._httpClient.post<IMovieResponse>(`${environment.baseUrl}/movies`, movieData);
  }
}
