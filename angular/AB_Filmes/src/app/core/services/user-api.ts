import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {IUserTokenSuccessAuth} from '../../shared/models/user-token-sucess-auth';
import {UserLoginSuccessResponse} from '../../shared/models/user-login-success-response';
import {UserTokenStore} from './user-token-store';
import {UserRegisterSuccessResponse} from '../../shared/models/user-register-success-response';
import {UserInfosStore} from './user-infos-store';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApi {
  private readonly _httpclient = inject(HttpClient);
  private readonly _userTokenStore = inject(UserTokenStore);
  private readonly _userInfosStore = inject(UserInfosStore);

  validateToken(): Observable<IUserTokenSuccessAuth> {
    return this._httpclient.get<IUserTokenSuccessAuth>(environment.baseUrl + '/users/validate-token');
  }

  login(email: string, password: string): Observable<UserLoginSuccessResponse> {
    return this._httpclient.post<UserLoginSuccessResponse>(environment.baseUrl + '/users/login', {
      email,
      password
    }).pipe(
      tap(({user: {id, name, email}}) => this._userInfosStore.setUserInfos({
        id, name, email
      })),
      tap((loginResponse) => this._userTokenStore.saveToken(loginResponse.token))
    );
  }

  register(name: string, email: string, password: string): Observable<UserRegisterSuccessResponse> {
    return this._httpclient.post<UserRegisterSuccessResponse>(environment.baseUrl + '/users', {
      name,
      email,
      password
    });
  }

}
