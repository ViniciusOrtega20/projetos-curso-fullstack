import {Routes} from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    loadComponent: () => import('../../features/auth/components/login-form/login-form').then(m => m.LoginForm)
  },
  {
    path: 'register',
    loadComponent: () => import('../../features/auth/components/register-user-form/register-user-form').then(m => m.RegisterUserForm)
  },
]
