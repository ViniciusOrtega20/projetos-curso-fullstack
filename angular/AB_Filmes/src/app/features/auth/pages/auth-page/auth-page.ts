import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-auth-page',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  templateUrl: './auth-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './auth-page.css',
})
export class AuthPage {
}

