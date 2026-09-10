import { Component } from '@angular/core';
import { Header } from '../header/header';
import { TasksPage } from '../../../features/tasks/tasks-page/tasks-page';
import { ModalController } from '../../../services/modal-controller';

@Component({
  imports: [Header, TasksPage],
  selector: 'app-layout',
  styleUrl: './app-layout.css',
  templateUrl: './app-layout.html',
})
export class AppLayout {
  protected readonly ModalController = ModalController;
}
