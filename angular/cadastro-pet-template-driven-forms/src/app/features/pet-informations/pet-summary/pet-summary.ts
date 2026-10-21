import { Component, signal } from '@angular/core';
import {IPetData} from '../../../shared/model/pet-data';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-pet-summary',
  imports: [
    RouterLink
  ],
  templateUrl: './pet-summary.html',
  styleUrl: './pet-summary.css',
})
export class PetSummary {
  petData = signal<IPetData>(history.state.petData);

  getSize(){
    switch (this.petData().size) {
      case 'small': { return 'Small'; }
      case 'medium': { return 'Medium'; }
      case 'large': { return 'Large'; }
      default: { return ''; }
    }
  }

  getTemperaments(){
    const labels = {
      docile: 'Dócil',
      active: 'Agitado(a)',
      protective: 'Protetor(a)'
    };

    return Object.entries(this.petData().temperament)
      .filter(([, selected]) => selected)
      .map(([key]) => labels[key as keyof typeof labels]);
  }
}
