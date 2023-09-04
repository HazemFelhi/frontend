import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms'; // Importez les classes FormBuilder et FormGroup
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategorieService } from '../services/categorie/categorie.service';
import { Categorie } from '../services/categorie/categorie';
import { Service } from '../services/service/service';
import { ServiceService } from '../services/service/service.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  result: any;
  form: FormGroup;
  services: Service[] = []; // Utilisez le tableau de type Service pour stocker les services

  constructor(private keycloakService: KeycloakService, private router: Router, private http: HttpClient,private formBuilder: FormBuilder, private categorieService: CategorieService,private serviceService:ServiceService) { this.form = this.formBuilder.group({

  });
}
  ngOnInit(): void {
  this.getAllCategory();
    this.getAllService(); 
    this.getAllCategories();
    this.getAllServices(); // Appelez la méthode pour récupérer tous les services au moment de l'initialisation

  }


  isConsulted = false;
  allCat: any;
  allSer: any;
  cat: any;

  getAllCategory() {
    this.allCat = this.categories;
    console.log(this.allCat);
  }

  getAllService() {
    this.allSer = this.services;
    this.cat = this.services;
  }

  filterData(cat: any) {
    if (cat.title === "Tout") {
      this.allSer = this.cat;
    } else {
      this.allSer = this.cat.filter((data: any) => {
        return data.category === cat.title;
      });
    }
  }

 
    


selectedCategory: Categorie | null = null;

categories: Categorie[] = [];

getAllCategories(): void {
  this.categorieService.getAllCategories().subscribe(
    (categories: Categorie[]) => {
      this.categories = categories;
    },
    (error: any) => {
      console.error('Une erreur s\'est produite lors de la récupération des catégories :', error);
    }
  );
}





onCategoryClick(category: Categorie | null): void {
  this.selectedCategory = category;
  if (category) {
    this.getServicesByCategory(category.nomCategorie);
  } else {
    this.services = []; // Réinitialise la liste des services si la catégorie est nulle (pour afficher tous les services)
  }
}

getServicesByCategory(nomCategorie: string): void {
  this.serviceService.getServicesByCategorie(nomCategorie).subscribe(
    (services: Service[]) => {
      this.services = services;
    },
    (error: any) => {
      console.error('Une erreur s\'est produite lors de la récupération des services par catégorie :', error);
    }
  );
}



getAllServices(): void {
  this.serviceService.getAllServices().subscribe(
    (services: Service[]) => {
      this.services = services; // Mettez à jour le tableau de services avec la réponse de l'API
    },
    (error: any) => {
      console.error('Une erreur s\'est produite lors de la récupération des services :', error);
    }
  );
}

// Méthode pour récupérer le chemin d'accès à l'image en fonction du nom du service
getImageUrl(serviceName: string): string {
  if (serviceName === 'Monitoring') {
    return 'assets/images/Monitoring.svg';
  } else if (serviceName === 'Virtual Machine') {
    return 'assets/images/vm.svg';
  } else if (serviceName === 'Kubernetes') {
    return 'assets/images/kubernetes.svg';
  } else if (serviceName === 'Network Lab') {
    return 'assets/images/networklab.svg';
  } else if (serviceName === 'Openstack') {
    return 'assets/images/Openstack Project.svg';
  } else {
    // Si aucun nom ne correspond, vous pouvez renvoyer une image par défaut
    return 'assets/images/default-image.png';
  }
}
  }