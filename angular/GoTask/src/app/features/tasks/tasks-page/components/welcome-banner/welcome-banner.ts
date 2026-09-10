import { Component, inject } from '@angular/core';
import { ModalController } from '../../../../../services/modal-controller';
import { NgOptimizedImage } from '@angular/common';
import { Task } from '../../../../../services/task';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-welcome-banner',
  styleUrl: './welcome-banner.css',
  templateUrl: './welcome-banner.html',
})
export class WelcomeBanner {
  private readonly _modalControllerService = inject(ModalController);
  private readonly _taskService = inject(Task);

  protected openNewTaskModal() {
    const dialogRef = this._modalControllerService.openNewTaskModal();
    dialogRef.closed.subscribe((taskForm) => {
      console.log('Tarefa criada', taskForm);
      if (taskForm) {
        this._taskService.addTask(taskForm);
      }
    });
  }
}
