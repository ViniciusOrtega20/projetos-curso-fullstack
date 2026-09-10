import { inject, Service } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TaskFormModal } from '../features/tasks/tasks-page/components/task-form-modal/task-form-modal';
import { ITaskFormControls } from '../interfaces/taks-form-controls';
import { ITask } from '../interfaces/task';
import { TaskCommentsModal } from '../features/tasks/tasks-page/components/task-comments-modal/task-comments-modal';

@Service()
export class ModalController {
  private readonly modalSizeOptions = {
    maxWidth: '617px',
    width: '95%',
  };
  private readonly _dialog = inject(Dialog);

  openNewTaskModal() {
    return this._dialog.open<ITaskFormControls>(TaskFormModal, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'create',
        formValues: {
          name: '',
          description: '',
        },
      },
    });
  }
  openEditTaskModal(formValues: ITaskFormControls) {
    return this._dialog.open<ITaskFormControls>(TaskFormModal, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'edit',
        formValues,
      },
    });
  }
  openCommentsTaskModal(task: ITask) {
    return this._dialog.open(TaskCommentsModal, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: task,
    });
  }
}
