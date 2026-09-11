import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-input-form',
  styleUrl: './input-form.css',
  templateUrl: './input-form.html',
})
export class InputForm {
  id = input.required<string>();
  text = input.required<string>();
  placeholder = input<string>('');
  msgCampObrigatorio = input<string>('');
  control = input.required<FormControl<string>>();
}
