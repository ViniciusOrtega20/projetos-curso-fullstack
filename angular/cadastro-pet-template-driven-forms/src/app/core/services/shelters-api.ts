import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SheltersApi {
  // Método que simula uma requisição HTTP com tempo de espera de 3s
  getAcceptedShelters(): Observable<string[]> {
    const shelters = [
      'Associação Vida Animal',
      'Santuário dos Quatro Patas',
      'Abrigo Esperança de Viver',
      'Refúgio Amigo Fiel',
      'Lar Doce Focinho',
    ];

    return of(shelters).pipe(delay(2000));
  }
}
