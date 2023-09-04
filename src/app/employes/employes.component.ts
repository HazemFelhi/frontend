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
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Employee } from '../services/employee/employee';
import { EmployeeService } from '../services/employee/employee.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  PolarAreaController,
  RadialLinearScale,
  ArcElement
);

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit{
  entrepriseDetails: Entreprise | null = null; // Use 'null' if it can be optional
  employee: any = {
    idEmploye: null,
    nom: '',
    prenom: '',
    entrepriseId: null,
    email: '',
    numTel: '',
    servicesCloud: []

  };
  employees: Employee[] = [];
  navigateToEmployeeDetails(employeeId: number) {
    this.router.navigate(['/employes', employeeId]);
  }
  
  ngOnInit(): void {



  this.route.queryParams.subscribe(params => {
    const idemp = params['idemp'];
    this.getEmployeeById(idemp);
    console.log('Employee ID:', idemp);

    });


   


  }



constructor(private entrepriseService: EntrepriseService,private keycloakService: KeycloakService,    private route: ActivatedRoute,private router: Router ,private employeeService :EmployeeService,
  private sanitizer: DomSanitizer


  ) {   

}






getEmployeeById(idEmploye: string): void {
  this.employeeService.getEmployeeById(idEmploye).subscribe(
    (data) => {
      this.employee=data;
      console.log(data);
    },
    (error: HttpErrorResponse) => {
    }
  );
}


isAuthenticated: Promise<boolean> | undefined;
















  

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
