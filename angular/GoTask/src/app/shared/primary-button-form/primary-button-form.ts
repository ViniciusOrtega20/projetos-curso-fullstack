import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-primary-button-form',
  styleUrl: './primary-button-form.css',
  templateUrl: './primary-button-form.html',
})
export class PrimaryButtonForm {
  id = input.required<string>();
  text = input.required<string>();
  disabled = input<boolean>(false);
}
