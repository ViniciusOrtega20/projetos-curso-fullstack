import {Component, inject, linkedSignal, signal} from '@angular/core';
import {MoviesList} from '../../../../shared/components/movies-list/movies-list';
import {NgOptimizedImage} from '@angular/common';
import {MoviesFilter} from '../../components/movies-filter/movies-filter';
import {MoviesApi} from '../../services/movies-api';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-explore-movies',
  imports: [MoviesList, NgOptimizedImage, MoviesFilter],
  templateUrl: './explore-movies-page.html',
  styleUrl: './explore-movies-page.css',
})
export class ExploreMoviesPage {
  private readonly _moviesApi = inject(MoviesApi);

  movieTitleFilter = signal('');
  movieCategoryFilter = signal('');

  hasFilter = linkedSignal(() => {
    return !!this.movieTitleFilter().trim() || !!this.movieCategoryFilter().trim();
  });
  moviesResource = rxResource({
    params: () => true,
    stream: () => this._moviesApi.getMovies(),
  });

  moviesFiltered = linkedSignal(() => {
    const movieList = this.moviesResource.value() ?? [];
    const hasError = !!this.moviesResource.error();

    if (hasError) return [];

    const titleFilter = this.movieTitleFilter().toLowerCase().trim();
    const categoryFilter = this.movieCategoryFilter().toLowerCase().trim();

    if (!titleFilter && !categoryFilter) {
      return movieList;
    }

    return movieList.filter((movie) => {
      const matchesTitle = movie.titulo.toLowerCase().includes(titleFilter);
      const matchesCategory = movie.genero.toLowerCase().includes(categoryFilter);

      console.log('matchesTitle: ', matchesTitle);
      console.log('matchesCategory: ', matchesCategory);
      return matchesTitle && matchesCategory;
    });
  });

  adicionarFilme() {
  }

  clearFilters() {
    this.movieTitleFilter.set('');
    this.movieCategoryFilter.set('');
  }
}
