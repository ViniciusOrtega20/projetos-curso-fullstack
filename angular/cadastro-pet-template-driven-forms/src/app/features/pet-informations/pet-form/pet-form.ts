import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ShelterNameValidatorDirective} from '../../../shared/directives/shelter-name-validator-directive';
import {Router} from '@angular/router';
import {IPetData} from '../../../shared/model/pet-data';

@Component({
  selector: 'app-pet-form',
  imports: [
    FormsModule,
    ShelterNameValidatorDirective
  ],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.css',
})
export class PetForm {
  private readonly _router = inject(Router);
    async onSubmit(form: NgForm) {
      if (form.valid) {
        await this._router.navigate(['/pet-summary'], {
          state: {
            petData: form.value as IPetData
          }
        });
      }
    }
}
