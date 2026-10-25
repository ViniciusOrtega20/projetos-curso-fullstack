import {Component, model, ChangeDetectionStrategy} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-movies-filter',
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './movies-filter.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
