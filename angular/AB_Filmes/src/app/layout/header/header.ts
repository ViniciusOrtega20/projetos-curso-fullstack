import {Component, inject, linkedSignal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {UserTokenStore} from '../../core/services/user-token-store';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UserInfosStore} from '../../core/services/user-infos-store';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly _userTokenStore = inject(UserTokenStore);
  private readonly _router = inject(Router);
  protected readonly _userInfoStore = inject(UserInfosStore);
  navigateEnd = toSignal(this._router.events.pipe(filter((event) => event instanceof NavigationEnd)));
  isMenuOpen = linkedSignal({
    source: this.navigateEnd,
    computation: () => false
  });

  toggleMenu() {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  logout() {
    this._userTokenStore.clearToken();
    this._userInfoStore.removeUserName();
    void this._router.navigate(['/auth/login']);
  }
}
