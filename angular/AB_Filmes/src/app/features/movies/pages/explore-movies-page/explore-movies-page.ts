import { Component, signal } from '@angular/core';
import { MoviesList } from '../../../../shared/components/movies-list/movies-list';

@Component({
  selector: 'app-explore-movies',
  imports: [MoviesList],
  templateUrl: './explore-movies-page.html',
  styleUrl: './explore-movies-page.css',
})
export class ExploreMoviesPage {
  movies = signal([{}]);

  adicionarFilme() {}
}
