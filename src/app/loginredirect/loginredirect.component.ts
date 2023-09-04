import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-loginredirect',
  templateUrl: './loginredirect.component.html',
  styleUrls: ['./loginredirect.component.css']
})
export class LoginredirectComponent implements OnInit {
  isAuthenticated: Promise<boolean> | undefined;

  constructor(
    private router: Router,
     private keycloakService: KeycloakService,
    private httpClient: HttpClient

  ) { }

  ngOnInit(): void {
    this.keycloakService.isLoggedIn().then((isLoggedIn) => {
      const isAdmin = this.keycloakService.getUserRoles().includes('admin_entreprises');
      const isEntrepriseAdmin = this.keycloakService.getUserRoles().includes('admin_entrepreneur');

      if (isAdmin) {
        this.router.navigateByUrl("/entreprise/gestion");
      } else if (isEntrepriseAdmin) {
        this.router.navigateByUrl("/entreprise/dash");
      } else {
        this.router.navigateByUrl("/entreprise/new");  // Redirection en cas d'absence de rôles appropriés
      }
    });
  }
}
