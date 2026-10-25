import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Header} from '../header/header';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    Header,
    RouterOutlet
  ],
  templateUrl: './main-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
