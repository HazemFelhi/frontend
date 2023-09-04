import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private keycloakService: KeycloakService) {}

  canActivate(): Promise<boolean> {
    return this.keycloakService.isLoggedIn().then(authenticated => {
      if (!authenticated) {
        this.keycloakService.login();
        return false;
      }
      return true;
    });
  }
}
