import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ITask } from '../interfaces/task';
import { ITaskFormControls } from '../interfaces/taks-form-controls';
import { generateUniqueId } from '../../../utils/generate-unique-id';
import { TaskStatusEnum } from '../../../enums/task-status';
import { TaskStatus } from '../type/task-status';
import { IComment } from '../interfaces/comments';

@Injectable({
  providedIn: 'root',
})
export class Task {
  // Tarefas em A Fazer
  private readonly todoTask$ = new BehaviorSubject<ITask[]>(
    this.loadTasksOnLocalStorage(TaskStatusEnum.TODO),
  );
  readonly todoTask = this.todoTask$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTasksOnLocalStorage(TaskStatusEnum.TODO, tasks)),
  );
  // Tarefas em Fazendo
  private readonly doingTask$ = new BehaviorSubject<ITask[]>(
    this.loadTasksOnLocalStorage(TaskStatusEnum.DOING),
  );
  readonly doingTask = this.doingTask$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTasksOnLocalStorage(TaskStatusEnum.DOING, tasks)),
  );
  // Tarefas em Concluido
  private readonly doneTask$ = new BehaviorSubject<ITask[]>(
    this.loadTasksOnLocalStorage(TaskStatusEnum.DONE),
  );
  readonly doneTask = this.doneTask$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTasksOnLocalStorage(TaskStatusEnum.DONE, tasks)),
  );

  addTask(taskInfos: ITaskFormControls) {
    const newTask: ITask = {
      id: generateUniqueId(),
      ...taskInfos,
      comments: [],
      status: TaskStatusEnum.TODO,
    };

    this.todoTask$.next([...this.todoTask$.getValue(), newTask]);
  }

  updateTaskStatus(taskId: string, taskCurrentStatus: TaskStatus, taskNextStatus: TaskStatus) {
    const currentTaskList$ = this.getTaskListByStatus(taskCurrentStatus);
    const nextTaskList$ = this.getTaskListByStatus(taskNextStatus);

    const currentTask = currentTaskList$.getValue().find((task) => task.id === taskId);

    if (currentTask) {
      currentTask.status = taskNextStatus;

      const currentTakListWithoutTask = currentTaskList$
        .getValue()
        .filter((task) => task.id !== taskId);

      currentTaskList$.next([...currentTakListWithoutTask]);

      nextTaskList$.next([...nextTaskList$.getValue(), { ...currentTask }]);
    }
  }

  updateTask(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    newTaskName: string,
    newTaskDescription: string,
  ) {
    const currentTaskList$ = this.getTaskListByStatus(taskCurrentStatus);

    const currentTaskIndex = currentTaskList$.getValue().findIndex((task) => task.id === taskId);

    if (currentTaskIndex !== -1) {
      const updateTaskList = [...currentTaskList$.getValue()];
      updateTaskList[currentTaskIndex] = {
        ...updateTaskList[currentTaskIndex],
        name: newTaskName,
        description: newTaskDescription,
      };

      currentTaskList$.next(updateTaskList);
    }
  }

  updateTaskComments(taskId: string, taskCurrentStatus: TaskStatus, newComments: IComment[]) {
    const currentTaskList$ = this.getTaskListByStatus(taskCurrentStatus);

    const currentTaskIndex = currentTaskList$.getValue().findIndex((task) => task.id === taskId);

    if (currentTaskIndex !== -1) {
      const updateTaskList = [...currentTaskList$.getValue()];
      updateTaskList[currentTaskIndex] = {
        ...updateTaskList[currentTaskIndex],
        comments: newComments,
      };

      currentTaskList$.next(updateTaskList);
    }
  }

  deleteTask(taskId: string, taskCurrentStatus: TaskStatus) {
    const currentTaskList$ = this.getTaskListByStatus(taskCurrentStatus);

    const updatedTaskList = currentTaskList$.getValue().filter((task) => task.id !== taskId);

    currentTaskList$.next(updatedTaskList);
  }

  private getTaskListByStatus(status: TaskStatusEnum) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTask$,
      [TaskStatusEnum.DOING]: this.doingTask$,
      [TaskStatusEnum.DONE]: this.doneTask$,
    };

    return taskListObj[status];
  }

  private saveTasksOnLocalStorage(key: string, tasks: ITask[]) {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas no localStorage: ', error);
    }
  }
  private loadTasksOnLocalStorage(key: string) {
    try {
      const tasks = localStorage.getItem(key);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Erro ao carregar tarefas do localStorage: ', error);
      return [];
    }
  }
}
