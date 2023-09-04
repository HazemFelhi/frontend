// keycloak-profile-extended.ts
import { KeycloakProfile } from 'keycloak-js'; // Import the original KeycloakProfile

interface KeycloakProfileExtended extends KeycloakProfile {
  entrepriseId: number; // Change the type to match the actual type of entrepriseId (e.g., number or string)
  signUpData: KeycloakSignUpData;
}

export default KeycloakProfileExtended;

export interface KeycloakSignUpData {
  nom: string;
  prenom: string;
  email: string;
  numTel: string;
}
