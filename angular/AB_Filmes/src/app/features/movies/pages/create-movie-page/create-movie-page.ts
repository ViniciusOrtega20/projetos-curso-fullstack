import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {rxResource} from '@angular/core/rxjs-interop';
import {MoviesApi} from '../../services/movies-api';
import {getErrorMessage} from '../../../../shared/utils/get-error-message';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-create-movie',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './create-movie-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './create-movie-page.css',
})
export class CreateMoviePage {
  private readonly _moviesApi = inject(MoviesApi);

  protected title = signal<string>('');
  protected year = signal<number | undefined>(undefined);
  protected category = signal<string>('');
  protected description = signal<string>('');
  protected imagePreview = signal<string | undefined>(undefined);
  protected selectedFile = signal<File | undefined>(undefined);

  protected movieFormData = signal<FormData | undefined>(undefined);
  protected createMovieResource = rxResource({
    params: () => this.movieFormData(),
    stream: ({params}) => this._moviesApi.createMovie(params),
  });

  protected errorMessage = computed(() => getErrorMessage(this.createMovieResource.error()));
  protected successMessage = computed(() => this.createMovieResource.hasValue() ? 'Filme criado com sucesso!' : undefined
  );

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);

      if (this.imagePreview()) {
        URL.revokeObjectURL(this.imagePreview()!);
      }

      const imageUrl = URL.createObjectURL(file);
      this.imagePreview.set(imageUrl);
    }
  }

  protected salvar() {
    const formData = new FormData();
    formData.append('titulo', this.title());
    formData.append('anoLancamento', this.year()?.toString() ?? '');
    formData.append('genero', this.category());
    formData.append('descricao', this.description());
    formData.append('image', this.selectedFile()!);

    this.movieFormData.set(formData);

    console.log('Filme salvo com sucesso!');
  }
}
