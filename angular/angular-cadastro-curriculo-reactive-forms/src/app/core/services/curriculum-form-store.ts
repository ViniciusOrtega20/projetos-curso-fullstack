import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CurriculumFormStore {
  private readonly curriculumForm = new FormGroup({
    personal: new FormGroup({
      name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      age: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.min(18)]}),
      address: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[^,]+,\s*[^,]+,\s*[^,]+$/), //Rua, numero, bairro
        ]
      }),
      state: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      city: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      maritalStatus: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    }),
    professional: new FormArray([
      new FormGroup({
         position: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
         company: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
         description: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        })
    ], [Validators.required]),
  });

  get curriculumFormGroup() {
    return this.curriculumForm;
  }

  get personalFormGroup() {
    return this.curriculumForm.controls.personal;
  }

  get professionalFormArray() {
    return this.curriculumForm.controls.professional;
  }

  resetProfessionalFormArray(){
    this.professionalFormArray.clear();
    this.professionalFormArray.push(new FormGroup({
      position: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      company: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      description: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    }));
  }
}
