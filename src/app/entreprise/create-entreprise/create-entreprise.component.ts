import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Entreprise } from 'src/app/services/entreprise/entreprise';

@Component({
  selector: 'app-create-entreprise',
  templateUrl: './create-entreprise.component.html',
  styleUrls: ['./create-entreprise.component.css']
})
export class CreateEntrepriseComponent implements OnInit {
  paysList = ['France', 'Allemagne', 'Tunisie']; // Ajoutez d'autres pays ici
  villesParPays: { [key: string]: string[] } = {
    'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse'],
    'Allemagne': ['Berlin', 'Munich', 'Hambourg', 'Cologne'],
    'Tunisie': ['Sousse', 'Mahdia', 'Monastir', 'Nabeul']
    // Ajoutez d'autres pays et leurs villes ici
  };
  villesList: string[] = [];
  entreprise: Entreprise = {
    entrepriseId: 0,
    nomEntreprise: '',
    nombreEmploye: null,
    pays: '',
    ville: '',
    numero: null,
    emailEntreprise: '',
    secteurActivites: '',
    adresse: '',
    codePostal: null,
    fixe: null,
    listeEmployes: [],
    adminId:''  
  };

  constructor(private entrepriseService: EntrepriseService, private router: Router) { }

  ngOnInit(): void {
    
  }

  miseAJourVilles() {
    const paysSelect = document.getElementById('pays') as HTMLSelectElement;
    const paysSelectionne = paysSelect.value;

    // Vérifier si la clé existe dans l'objet avant d'accéder aux villes
    if (this.villesParPays.hasOwnProperty(paysSelectionne)) {
      this.villesList = this.villesParPays[paysSelectionne];
    } else {
      // Si la clé n'existe pas (par exemple, pour un pays sans villes définies),
      // videz simplement la liste des villes.
      this.villesList = [];
    }
  }

  createEntreprise(entrepriseForm: NgForm): void {
    if (entrepriseForm.invalid) {
      return; 
    }
    this.entreprise.adminId=sessionStorage.getItem("userId");
    this.entrepriseService.createEntreprise(this.entreprise).subscribe(
      (data) => {
        console.log("Entreprise créée avec succès :", data);
        entrepriseForm.resetForm();
        this.router.navigate(['/entreprise/dash'], { queryParams: { created: 'true', id: data.entrepriseId } });
      },
      (error) => {
        console.error("Une erreur s'est produite lors de la création de l'entreprise :", error);
        this.router.navigateByUrl("/entreprise/dash")

      }
    );
  }


  

}
