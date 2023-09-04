import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

export class PanierComponent {
  isAuthenticated: Promise<boolean> | undefined;
  pageContent : string = `
  Cumulus, seulement si vous voulez ce qu’il y a de mieux.
  Votre cloud
  à portée de main
  La plateforme cumulus est conçue pour vous aider à donner vie à de nouvelles solutions, 
  afin de relever les défis actuels et de créer l’avenir.`;


  performSearch(): void {
    if (this.searchText && this.pageContent) {
      const searchTextLC = this.searchText.toLowerCase();
      const pageContentLC = this.pageContent.toLowerCase();
      
      this.searchResults = pageContentLC
        .split(' ')
        .filter(word => word.indexOf(searchTextLC) !== -1);
    } else {
      this.searchResults = [];
    }
  }
        
  constructor(private keycloakService: KeycloakService, private router: Router) {

  }

  ngOnInit(): void {
    this.initializeUserOptions();
    this.checkAuthentication();
  }
    
  
  checkAuthentication(): void {
    this.keycloakService.isLoggedIn().then(authenticated => {
      this.isAuthenticated = Promise.resolve(authenticated);
    });
  }

  getToken(): void {
    this.keycloakService.isLoggedIn().then(authenticated => {
      if (authenticated) {
        this.keycloakService.getToken().then(token => {
          console.log('Keycloak token:', token);
        });
      } else {
        console.log('User not authenticated');
      }
    });
  }

  logout(): void {
    this.keycloakService.logout();
  }
  
  user = '';

  private initializeUserOptions(): void {
    this.user = this.keycloakService.getUsername();
  }


















  searchText: string = '';
  searchResults: string[] = [];


  
}
