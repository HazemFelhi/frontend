import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'prob';
 
  showFooterContact: boolean = false;
  showFooterAccueil: boolean = false;
  showFooterApropos: boolean = false;
  showFooterCatalogue: boolean = false;
  showFooterNew: boolean = false;
  showHeaderFacture: boolean = false;
  showHeaderGestion :boolean=false;
  showHeaderUpdate :boolean=false;
  showHeaderGest:boolean=false;
  showFooterPaquet: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to router events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route contains '/contact' in its path
        this.showFooterContact = this.router.url.includes('/contact');
        // Check if the current route contains '/accueil' in its path
        this.showFooterAccueil = this.router.url.includes('/accueil');
        // Check if the current route contains '/apropos' in its path
        this.showFooterApropos = this.router.url.includes('/apropos');
        // Check if the current route contains '/catalogue' in its path
        this.showFooterCatalogue = this.router.url.includes('/catalogue');
        this.showFooterNew = this.router.url.includes('/entreprise/new');
        this.showHeaderFacture = this.router.url.includes('/facture');
        this.showHeaderGestion = this.router.url.includes('/entreprise/gestion');
        this.showHeaderUpdate = this.router.url.includes('/entreprise/update');
        this.showHeaderGest = this.router.url.includes('/entreprise/gest');


      }
    });
  }




}
