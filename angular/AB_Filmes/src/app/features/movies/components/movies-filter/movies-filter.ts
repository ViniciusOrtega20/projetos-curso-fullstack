import {Component, model} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-movies-filter',
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './movies-filter.html',
  styleUrl: './movies-filter.css',
})
export class MoviesFilter {
  title = model<string>('');
  category = model<string>('');

  clearFilters() {
    this.title.set('');
    this.category.set('');
  }
}
