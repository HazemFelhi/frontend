export interface Entreprise {
   entrepriseId: number;
    nomEntreprise: string;
    nombreEmploye: number| null;
    pays: string;
    ville: string;
    numero: number| null;
    emailEntreprise: string;
    secteurActivites: string;
    adresse: string;
    codePostal: number| null;
    fixe: number| null;
    listeEmployes: string[];
    adminId: string | null;
  }
  