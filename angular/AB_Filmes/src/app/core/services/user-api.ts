import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {IUserTokenSuccessAuth} from '../../shared/models/user-token-sucess-auth';
import {IUserLoginSuccessResponse} from '../../shared/models/IUserLoginSuccessResponse';
import {UserTokenStore} from './user-token-store';

@Injectable({
  providedIn: 'root'
})
export class UserApi {
  private readonly _httpclient = inject(HttpClient);
  private readonly _userTokenStore = inject(UserTokenStore);

  validateToken(): Observable<IUserTokenSuccessAuth> {
    return this._httpclient.get<IUserTokenSuccessAuth>('http://localhost:3000/users/validate-token');
  }

  login(email: string, password: string): Observable<IUserLoginSuccessResponse> {
    return this._httpclient.post<IUserLoginSuccessResponse>('http://localhost:3000/users/login', {
      email,
      password
    }).pipe(
      tap((loginResponse) => this._userTokenStore.saveToken(loginResponse.token))
    );
  }

  register(username: string, password: string): Observable<Object> {
    return this._httpclient.get('http://localhost:3000/user/validate-token');
  }
}
