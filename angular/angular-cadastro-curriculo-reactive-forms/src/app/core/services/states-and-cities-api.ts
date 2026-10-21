import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IStateResponse, StatesListResponse} from '../shared/models/state-response';
import {map, Observable} from 'rxjs';
import {CitiesListResponse, ICitiesResponse} from '../shared/models/cities-response';

@Injectable({
  providedIn: 'root',
})
export class StatesAndCitiesApi{
    private readonly _httpClient = inject(HttpClient);

    getStates(): Observable<StatesListResponse> {
      return this._httpClient.post<IStateResponse>('https://countriesnow.space/api/v0.1/countries/states', {
        country: 'Brazil'
      }).pipe(
        map((statesResponse) => statesResponse.data.states)
      );
    }

    getCitiesByState(state: string): Observable<CitiesListResponse> {
      return this._httpClient.post<ICitiesResponse>('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: 'Brazil',
        state: state
      }).pipe(
        map((citiesResponse) => citiesResponse.data)
      )
    }
}
