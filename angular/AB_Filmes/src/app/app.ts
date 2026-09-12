import {Component} from '@angular/core';
import {Header} from './layout/header/header';
import {CreateMoviePage} from './features/movies/pages/create-movie-page/create-movie-page';

@Component({
  selector: 'app-root',
  imports: [Header, CreateMoviePage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
}
