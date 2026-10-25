import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MoviesListResponse} from '../../types/movies-list-response';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-movies-list',
  imports: [
    NgOptimizedImage,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'flex-1 min-h-0',
  },
})
export class MoviesList {
  protected BASE_PATH = environment.baseUrl;
  movies = input<MoviesListResponse>([]);
}
