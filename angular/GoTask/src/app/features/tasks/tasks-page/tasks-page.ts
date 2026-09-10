import { Component } from '@angular/core';
import { WelcomeBanner } from './components/welcome-banner/welcome-banner';
import { TaskBoard } from './components/task-board/task-board';

@Component({
  imports: [WelcomeBanner, TaskBoard],
  selector: 'app-tasks-page',
  styleUrl: './tasks-page.css',
  templateUrl: './tasks-page.html',
})
export class TasksPage {}
