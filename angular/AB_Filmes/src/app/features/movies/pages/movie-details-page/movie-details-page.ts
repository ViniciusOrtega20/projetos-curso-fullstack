import {Component, computed, inject, input, linkedSignal, signal} from '@angular/core';
import {MoviesApi} from '../../services/movies-api';
import {rxResource} from '@angular/core/rxjs-interop';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {tap} from 'rxjs';
import {FavoritesApi} from '../../../../shared/services/favorites-api';

@Component({
  selector: 'app-movie-details',
  imports: [
    NgOptimizedImage,
    DecimalPipe
  ],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.css',
})
export class MovieDetailsPage {
  private readonly _moviesApi = inject(MoviesApi);
  private readonly _favoritesApi = inject(FavoritesApi);
  readonly BASE_URL = 'http://localhost:3000';

  protected id = input.required<string>();

  protected currentRating = signal<number | undefined>(undefined); // Inicia com 4 estrelas preenchidas

  protected startStatusFlled = computed(() => {
    const rating = this.currentRating() ?? 0;
    return [0, 1, 2, 3, 4].map((index) => index < rating);
  });

  protected rateMovieResource = rxResource({
    params: () => {
      const rating = this.currentRating() ?? 0;
      if (rating > 0) return {
        id: Number(this.id()),
        rating: this.currentRating() ?? 0,
      };

      return undefined;
    },
    stream: ({params}) => this._moviesApi.setRateMovie(params.id, params.rating).pipe(
      tap((updateMovie) => {
        this.movieDetails.set(updateMovie);
      })
    ),
  });

  isMovieFavoriteResource = rxResource({
    params: () => this.id(),
    stream: ({params}) => this._favoritesApi.isMovieInFavorites(Number(params)),
  });

  protected isFavorite = linkedSignal(() => {
    const ERROR_ON_RESPONSE = !!this.isMovieFavoriteResource.error();

    if (ERROR_ON_RESPONSE) return false;

    return this.isMovieFavoriteResource.value() ?? false;
  });


  protected movieDetailsResource = rxResource({
    params: () => this.id(),
    stream: ({params}) => this._moviesApi.getMovieDetails(Number(params)),
  });

  protected movieDetails = linkedSignal(() => {
    if (this.movieDetailsResource.error()) {
      return undefined;
    }

    return this.movieDetailsResource.value();
  });

  toggleFavoriteParams = signal<boolean | undefined>(undefined)

  toggleMovieFavoriteResource = rxResource({
    params: () => {
      const status = this.toggleFavoriteParams();
      if (status === undefined) return undefined;

      return {
        currentFavoriteStatus: status,
        movieId: Number(this.id()),
      }
    },
    stream: ({params}) => this._favoritesApi.toggleMovieFavorite(params.currentFavoriteStatus, params.movieId).pipe(tap(() => this.isFavorite.update(currentValue => !currentValue))),
  });

  protected toggleFavorite() {
    this.toggleFavoriteParams.set(this.isFavorite());
  }

  protected updateRating(newRating: number) {
    if (newRating === this.currentRating()) {
      this.currentRating.set(0);
    } else {
      this.currentRating.set(newRating);
    }
  }


}
