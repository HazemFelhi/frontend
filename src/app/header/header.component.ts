import { Component, OnInit } from '@angular/core';
import {  KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RedirectService } from '../RedirectService';
import { KeycloakOptions } from 'keycloak-angular'; // Adjust the import path as per your project setup
import { KeycloakLoginOptions } from 'keycloak-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
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
        
  constructor(private keycloakService: KeycloakService, private router: Router ) {

  }

  ngOnInit(): void {

    this.initializeUserOptions();
    this.checkAuthentication();
     this.keycloakService.loadUserProfile().then((data)=>{console.log(<string>data.id)}) ;

  }



  
  log(): void {
    const loginOptions: KeycloakLoginOptions = {
      redirectUri: 'http://localhost:4200/loginredirect'
    };

    this.keycloakService.login(loginOptions);
  } 










   /*log(): void {
    const loginOptions: KeycloakLoginOptions = {
      redirectUri: 'http://localhost:4200/' // Set the default redirect URI to the base URL
    };
      this.keycloakService.login(loginOptions)
      .then(() => {
        return this.keycloakService.getKeycloakInstance().loadUserProfile()
          .then((data: KeycloakProfile) => {
            const isAdmin = this.keycloakService.getUserRoles().includes('admin');
            if (isAdmin) {
              this.router.navigateByUrl('/entreprise/gestion');
            } else {
              this.router.navigateByUrl('/entreprise/new');
            }
  
            return true;
          });
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  } */



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
