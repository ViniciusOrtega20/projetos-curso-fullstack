import {Component, computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {CurriculumFormStore} from '../../../../core/services/curriculum-form-store';
import {ReactiveFormsModule} from '@angular/forms';
import {StatesAndCitiesApi} from '../../../../core/services/states-and-cities-api';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {InputValidationDirective} from '../../../../core/shared/directives/input-validation-directive';
import {IStateResponse} from '../../../../core/shared/models/state-response';
import {CitiesListResponse} from '../../../../core/shared/models/cities-response';

@Component({
  selector: 'app-step-personal',
  imports: [ReactiveFormsModule, InputValidationDirective],
  templateUrl: './step-personal.html',
})
export class StepPersonal {
  readonly _curriculumFormStore = inject(CurriculumFormStore);
  private readonly _router = inject(Router);
  private readonly _statesAndCitiesApi = inject(StatesAndCitiesApi);

  get stateControl() {
    return this._curriculumFormStore.personalFormGroup.controls.state;
  }

  get cityControl() {
    return this._curriculumFormStore.personalFormGroup.controls.city;
  }

  selectedState = toSignal(this.stateControl!.valueChanges.pipe(
    tap(() => {
      this.cityControl.setValue('', {emitEvent: false});
    })
  ),
    {
    initialValue: this.stateControl!.value || ''
  }
  );

  stateResource = rxResource({
    params: () => true,
    stream: () => this._statesAndCitiesApi.getStates()
  });

  statesList = computed<IStateResponse[]>(() => {
    if (this.stateResource.error()) return [];

    return this.stateResource.value() ?? [];
  });

  citiesResource = rxResource({
    params: () => this.selectedState() || undefined,
    stream: ({params}) => this._statesAndCitiesApi.getCitiesByState(params)
  });

  citiesList = computed(() => {
    if (this.citiesResource.error()) return [];

    return this.citiesResource.value() ?? [];
  });

  protected async goToNextStep() {
    await this._router.navigate(['/professional']);
  }
}
