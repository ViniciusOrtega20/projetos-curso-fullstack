import {Component, computed, inject, signal} from '@angular/core';
import {email, Field, form, minLength, required} from '@angular/forms/signals';
import {NgOptimizedImage} from '@angular/common';
import {rxResource} from '@angular/core/rxjs-interop';
import {UserApi} from '../../../../core/services/user-api';
import {Router} from '@angular/router';
import {tap} from 'rxjs';
import {ILoginParams} from '../../../../shared/models/ILoginParams';
import {getErrorMessage} from '../../../../shared/utils/get-error-message';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [
    Field,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private readonly _userApi = inject(UserApi);
  private readonly _router = inject(Router);
  protected loginModel = signal<ILoginParams>({email: '', password: ''});
  protected loginParams = signal<ILoginParams | undefined>(undefined);

  protected readonly loginError = computed(() => getErrorMessage(this.loginResource.error()));
  protected loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, {message: 'O Email é obrigatório'});
    email(fieldPath.email, {message: 'O Email é inválido'});

    required(fieldPath.password, {message: 'A senha é obrigatório'});
    minLength(fieldPath.password, 8, {message: 'A senha deve ter no mínimo 8 caracteres'});
  });

  protected loginResource = rxResource({
    params: () => this.loginParams(),
    stream: ({params}) => this._userApi.login(params.email, params.password).pipe(
      tap(() => this._router.navigate(['/explore']))
    )
  });

  protected login() {
    const credentials = this.loginForm().value();

    this.loginParams.set(credentials);
  }
}
