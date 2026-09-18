import {Component, computed, inject, signal} from '@angular/core';
import {UserApi} from '../../../../core/services/user-api';
import {Router} from '@angular/router';
import {setErrorMessage} from '../../../../shared/utils/set-error-message';
import {email, Field, form, minLength, required} from '@angular/forms/signals';
import {rxResource} from '@angular/core/rxjs-interop';
import {IRegisterParams} from '../../../../shared/models/IRegisterParams';
import {NgOptimizedImage} from '@angular/common';
import {confirmPassword} from '../../validators/confirmPassword';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register-user-form',
  imports: [
    NgOptimizedImage,
    Field,
    FormsModule
  ],
  templateUrl: './register-user-form.html',
  styleUrl: './register-user-form.css',
})
export class RegisterUserForm {
  private readonly _userApi = inject(UserApi);
  private readonly _router = inject(Router);
  protected registerModel = signal<IRegisterParams>({name: '', email: '', password: '', confirmPassword: ''});
  protected registerParams = signal<IRegisterParams | undefined>(undefined);
  protected successMessage = computed(() => {
    return this.registerResource.hasValue() ? 'Usuário cadastrado com sucesso!' : undefined
  })
  protected readonly registerError = computed(() => setErrorMessage(this.registerResource.error()));

  protected registerForm = form(this.registerModel, (fieldPath) => {
    required(fieldPath.name, {message: 'O Nome é obrigatório'});

    required(fieldPath.email, {message: 'O Email é obrigatório'});
    email(fieldPath.email, {message: 'O Email é inválido'});

    required(fieldPath.password, {message: 'A senha é obrigatório'});
    minLength(fieldPath.password, 8, {message: 'A senha deve ter no mínimo 8 caracteres'});

    confirmPassword(fieldPath.password, fieldPath.confirmPassword);
  });

  protected registerResource = rxResource({
    params: () => this.registerParams(),
    stream: ({params}) => this._userApi.register(params.name, params.email, params.password)
  });

  protected register() {
    const credentials = this.registerForm().value();

    this.registerParams.set(credentials);
  }

}
