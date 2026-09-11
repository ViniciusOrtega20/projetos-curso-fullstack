import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-comentario-modal',
  styleUrl: './comentario-modal.css',
  templateUrl: './comentario-modal.html',
})
export class ComentarioModal {
  id = input.required<string>();
  text = input.required<string>();
  time = input.required<string>();
  lastItem = input.required<boolean>();

  readonly removeComment = output<string>();
  protected onRemoveComment() {
    this.removeComment.emit(this.id());
  }
}
