// entreprise-data.service.ts

import { Injectable } from '@angular/core';
import { Entreprise } from './services/entreprise/entreprise';

@Injectable({
  providedIn: 'root',
})
export class EntrepriseDataService  {
  private entreprise: Entreprise | null = null;

  getEntreprise(): Entreprise | null {
    return this.entreprise;
  }

  setEntreprise(data: Entreprise): void {
    this.entreprise = data;
  }
}

