import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Document } from 'src/app/services/document/document'; 

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
  PolarAreaController,
  RadialLinearScale,
  ArcElement
} from 'chart.js';
import { DocumentService } from 'src/app/services/document/document.service';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';
import { Entreprise } from 'src/app/services/entreprise/entreprise';
import { HttpErrorResponse } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-entreprise',
  templateUrl: './update-entreprise.component.html',
  styleUrls: ['./update-entreprise.component.css']
})
export class UpdateEntrepriseComponent   implements OnInit{
  invitationSent:boolean=false;
  private invitationTimer: any | null = null; // Déclaration de la propriété

  constructor(private entrepriseService: EntrepriseService,private keycloakService: KeycloakService,    private route: ActivatedRoute,private router: Router

    ) {   
  
  }
  retour(entrepriseId: number) {

    console.log(entrepriseId);
    this.router.navigate(['/entreprise/gest'], { queryParams: {  abc : entrepriseId } });
  
    }
  
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
  


  ngOnInit(): void {



    this.route.queryParamMap.subscribe((params) => {

     this.entreprise.entrepriseId = params.get("eid") || 0 ;
     this.getEntrepriseById (this.entreprise.entrepriseId);
      console.log(params);
      console.log(this.entreprise.entrepriseId);
    });
  }









  updateEntreprise() {
    this.entrepriseService.updateEntreprise(this.entreprise).subscribe(
      (updatedEntreprise) => {
        // Handle successful update
        console.log('Entreprise updated successfully:', updatedEntreprise);
        this.invitationSent=true;
        this.invitationTimer = setTimeout(() => {
          this.invitationSent = false;
        }, 2000); 

      },
      (error) => {
        // Handle error
        console.error('Error while updating entreprise:', error);
      }
    );
  }
  



}