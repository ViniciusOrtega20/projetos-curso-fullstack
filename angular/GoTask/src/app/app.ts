import { Component } from '@angular/core';
import { AppLayout } from './core/layout/app-layout/app-layout';

@Component({
  imports: [AppLayout],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
