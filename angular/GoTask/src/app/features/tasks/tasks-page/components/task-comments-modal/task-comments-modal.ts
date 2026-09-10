import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { PrimaryButtonForm } from '../../../../../shared/primary-button-form/primary-button-form';
import { ComentarioModal } from './components/comentario-modal/comentario-modal';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ITask } from '../../../../../interfaces/task';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IComment } from '../../../../../interfaces/comments';
import { generateUniqueId } from '../../../../../utils/generate-unique-id';

@Component({
  imports: [PrimaryButtonForm, ComentarioModal, NgOptimizedImage, ReactiveFormsModule, DatePipe],
  selector: 'app-task-comments-modal',
  styleUrl: './task-comments-modal.css',
  templateUrl: './task-comments-modal.html',
})
export class TaskCommentsModal {
  readonly _task: ITask = inject(DIALOG_DATA);
  protected taskCommentsChange = false;
  protected readonly _dialogRef = inject(DialogRef);
  private readonly commentInput = viewChild.required<ElementRef<HTMLInputElement>>('commentInput');

  protected commentControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  protected onAddComment() {
    const newComment: IComment = {
      id: generateUniqueId(),
      description: this.commentControl.value,
      createdAt: new Date(),
    };

    this._task.comments.unshift(newComment);
    this.commentControl.reset();
    this.taskCommentsChange = true;
    this.commentInput().nativeElement.focus();
  }

  protected onRemoveComment(commentId: string) {
    console.log('Removing comment with ID:', commentId);
    this._task.comments = this._task.comments.filter((comment) => comment.id !== commentId);
    this.taskCommentsChange = true;
  }

  protected closeModal() {
    this._dialogRef.close(this.taskCommentsChange);
  }
}
