import {Component, computed, inject} from '@angular/core';
import {MoviesList} from '../../../../shared/components/movies-list/movies-list';
import {FavoritesApi} from '../../../../shared/services/favorites-api';
import {rxResource} from '@angular/core/rxjs-interop';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-favorite-movies',
  imports: [MoviesList, NgOptimizedImage],
  templateUrl: './favorite-movies-page.html',
  styleUrl: './favorite-movies-page.css',
})
export class FavoriteMoviesPage {
  private readonly _favoritesApi = inject(FavoritesApi);

  favoritesResource = rxResource({
    stream: () => this._favoritesApi.getFavorites()
  });

  favoritesList = computed(() => {
    const hasError = !!this.favoritesResource.error();

    if (hasError) return [];

    return this.favoritesResource.value() || [];
  })
}
