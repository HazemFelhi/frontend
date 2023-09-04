import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Entreprise } from 'src/app/services/entreprise/entreprise';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';

@Component({
  selector: 'app-gestion-entreprise',
  templateUrl: './gestion-entreprise.component.html',
  styleUrls: ['./gestion-entreprise.component.css']
})
export class GestionEntrepriseComponent {
  entrepriseData: Entreprise[] = [];
  entreprise: any = {
    entrepriseId :null,
    nomEntreprise: '',
    nombreEmploye: null,
    adresse: '',
    numero: null,
    email: '',
    pays: '',
    selectedSecteur: '',
    ville: '',
    codePostal: null,
    fixe: null,
    adminId: ''
  };
  
  constructor(private entrepriseService: EntrepriseService,private keycloakService: KeycloakService,private router: Router,
    private route: ActivatedRoute) {}
  isAuthenticated: Promise<boolean> | undefined;

  ngOnInit(): void {
    this.loadEntrepriseData();
    this.initializeUserOptions();
    this.checkAuthentication();
    this.route.queryParamMap.subscribe((params) => {

      this.entreprise.entrepriseId = params.get("abc") || 0 ;
      this.getEntrepriseById (this.entreprise.entrepriseId);
       console.log(params);
       console.log(this.entreprise.entrepriseId);
     });
 
  }
  public getEntrepriseById(id: number): void {
    this.entrepriseService.getEntrepriseById(id).subscribe(
      (data) => {
        this.entreprise = data;
        console.log('Fetched entreprise:', this.entreprise);
        // Once the entreprise object is fetched, you can call the uploadDocument() method here
      },
      (error: HttpErrorResponse) => {
        console.error("Erreur lors de la récupération de l'entreprise :", error);
      }
    );
  }

  loadEntrepriseData() {
    this.entrepriseService.getAllEntreprises().subscribe(
      (data) => {
        this.entrepriseData = data;
      },
      (error) => {
        console.log('Erreur lors du chargement des informations des entreprises', error);
      }
    );
  }
  voirPlusDetails(entrepriseId: number) {

  console.log(entrepriseId);
  this.router.navigate(['/entreprise/gest'], { queryParams: {  eid: entrepriseId } });

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


  
  log(): void {
    
    this.keycloakService.login();
  } 



  }
