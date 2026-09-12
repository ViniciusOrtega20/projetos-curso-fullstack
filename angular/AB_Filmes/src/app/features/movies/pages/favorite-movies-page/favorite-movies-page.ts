import { Component } from '@angular/core';
import { MoviesList } from '../../../../shared/components/movies-list/movies-list';

@Component({
  selector: 'app-favorite-movies',
  imports: [MoviesList],
  templateUrl: './favorite-movies-page.html',
  styleUrl: './favorite-movies-page.css',
})
export class FavoriteMoviesPage {}
