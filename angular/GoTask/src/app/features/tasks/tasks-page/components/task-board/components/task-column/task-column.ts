import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from '../../../../../../../interfaces/task';
import { TaskStatus } from '../../../../../../../type/task-status';
import { TaskStatusEnum } from '../../../../../../../enums/task-status';
import { Task } from '../../../../../../../services/task';

@Component({
  imports: [TaskCard, CdkDropList, CdkDrag],
  selector: 'app-task-column',
  styleUrl: './task-column.css',
  templateUrl: './task-column.html',
})
export class TaskColumn {
  private readonly _taskService = inject(Task);

  statusColor = computed(() => {
    switch (this.status()) {
      case 'todo':
        return '#080B12';
      case 'doing':
        return '#FF850A';
      case 'done':
        return '#15BE78';
    }
  });
  readonly status = input.required<'todo' | 'doing' | 'done'>();
  readonly titulo = input.required<string>();
  readonly totalTarefas = input<number>(0);
  readonly taskList: InputSignal<ITask[]> = input.required<ITask[]>();

  protected onCardDrop(event: CdkDragDrop<ITask[]>) {
    this.moveCardToColumn(event);
    const taskId = event.item.data.id;
    const taskCurrentStatus = event.item.data.status;
    const droppedColumn = event.container.id;

    this.updateTaskStatus(taskId, taskCurrentStatus, droppedColumn);
  }

  private moveCardToColumn(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  private updateTaskStatus(taskId: string, taskCurrentStatus: TaskStatus, droppedColumn: string) {
    let taskNextStatus: TaskStatus;
    switch (droppedColumn) {
      case 'todo-column':
        taskNextStatus = TaskStatusEnum.TODO;
        break;

      case 'doing-column':
        taskNextStatus = TaskStatusEnum.DOING;
        break;

      case 'done-column':
        taskNextStatus = TaskStatusEnum.DONE;
        break;

      default:
        throw new Error(`Coluna inválida: ${droppedColumn}`);
    }

    this._taskService.updateTaskStatus(taskId, taskCurrentStatus, taskNextStatus);
  }
}
