import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-secondary-button-form',
  styleUrl: './secondary-button-form.css',
  templateUrl: './secondary-button-form.html',
})
export class SecondaryButtonForm {
  id = input.required<string>();
  text = input.required<string>();
}
