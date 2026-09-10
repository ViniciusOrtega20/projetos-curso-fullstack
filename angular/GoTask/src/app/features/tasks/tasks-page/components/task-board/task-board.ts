import { Component, inject, signal } from '@angular/core';
import { ITask } from '../../../../../interfaces/task';
import { Task } from '../../../../../services/task';
import { AsyncPipe } from '@angular/common';
import { TaskColumn } from './components/task-column/task-column';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  imports: [AsyncPipe, TaskColumn, CdkDropListGroup],
  selector: 'app-task-board',
  styleUrl: './task-board.css',
  templateUrl: './task-board.html',
})
export class TaskBoard {
  protected readonly todoTasks = signal<ITask[]>([]);
  protected readonly doingTasks = signal<ITask[]>([]);
  protected readonly doneTasks = signal<ITask[]>([]);

  protected readonly _taskService = inject(Task);

  ngOnInit() {
    this._taskService.todoTask.subscribe((todoList) => {
      this.todoTasks.set(todoList);
    });
    this._taskService.doingTask.subscribe((doingList) => {
      this.doingTasks.set(doingList);
    });
    this._taskService.doneTask.subscribe((doneList) => {
      this.doneTasks.set(doneList);
    });
  }
}
