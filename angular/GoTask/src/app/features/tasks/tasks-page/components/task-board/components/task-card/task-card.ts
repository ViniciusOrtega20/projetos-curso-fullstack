import { Component, inject, input, InputSignal } from '@angular/core';
import { ModalController } from '../../../../../../../services/modal-controller';
import { NgOptimizedImage } from '@angular/common';
import { ITask } from '../../../../../../../interfaces/task';
import { Task } from '../../../../../../../services/task';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-task-card',
  styleUrl: './task-card.css',
  templateUrl: './task-card.html',
})
export class TaskCard {
  private readonly _modalControllerService = inject(ModalController);
  private readonly _taskService = inject(Task);
  readonly task: InputSignal<ITask> = input.required<ITask>();

  protected openEditTaskModal() {
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: this.task().name,
      description: this.task().description,
    });
    dialogRef.closed.subscribe((taskForm) => {
      if (taskForm) {
        this._taskService.updateTask(
          this.task().id,
          this.task().status,
          taskForm.name,
          taskForm.description,
        );
      }
    });
  }

  protected openCommentsTaskModal() {
    const dialogRef = this._modalControllerService.openCommentsTaskModal(this.task());
    dialogRef.closed.subscribe((taskCommentsChanged) => {
      if (taskCommentsChanged) {
        console.log('Tarefa atualizada com novos comentários:', this.task().comments);
        this._taskService.updateTaskComments(
          this.task().id,
          this.task().status,
          this.task().comments,
        );
      }
    });
  }

  protected openDeleteTaskModal() {
    console.log('Deletando tarefa:', this.task().id);
    this._taskService.deleteTask(this.task().id, this.task().status);
  }
}
