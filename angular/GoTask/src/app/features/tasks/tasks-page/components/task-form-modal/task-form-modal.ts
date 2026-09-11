import { Component, inject } from '@angular/core';
import { InputForm } from '../../../../../shared/input-form/input-form';
import { SecondaryButtonForm } from '../../../../../shared/secondary-button-form/secondary-button-form';
import { PrimaryButtonForm } from '../../../../../shared/primary-button-form/primary-button-form';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ITaskFormModalData } from '../../../interfaces/task-form-modal-data';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITaskFormControls } from '../../../interfaces/taks-form-controls';
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [
    InputForm,
    SecondaryButtonForm,
    PrimaryButtonForm,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  selector: 'app-task-form-modal',
  styleUrl: './task-form-modal.css',
  templateUrl: './task-form-modal.html',
})
export class TaskFormModal {
  protected readonly _data: ITaskFormModalData = inject(DIALOG_DATA);
  protected readonly _dialogRef = inject(DialogRef);

  protected readonly taskForm = new FormGroup({
    name: new FormControl(this._data.formValues.name, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),

    description: new FormControl(this._data.formValues.description, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  protected onSubmit() {
    this.closeModal(this.taskForm.getRawValue());
  }

  protected closeModal(formvalues: ITaskFormControls | undefined = undefined) {
    this._dialogRef.close(formvalues);
  }
}
