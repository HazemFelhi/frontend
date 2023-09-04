import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../services/employee/employee';
import { EmployeeService } from '../services/employee/employee.service';
import { EntrepriseService } from '../services/entreprise/entreprise.service';
import { KeycloakService, UserRepresentation } from '../services/keycloak/keycloak.service';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  entreprise: any = {
    id: null,
    nomEntreprise: '',
    nombreEmploye: null,
    adresse: '',
    numero: null,
    email: '',
    pays: '',
    selectedSecteur: '',
    ville: '',
    codePostal: null,
    fixe: null
  };
  
  isInvitationSent: boolean = false;
  isHistoriquePage: boolean = true;
  employee: Employee = {
    idEmploye:'',
    nom: '',
    prenom: '',
    entrepriseId: 0,
    email: '',
    numTel: '',
    servicesCloud: []
  };
  
  constructor(
    private employeeservice: EmployeeService,
    private router: Router,
    private entrepriseService: EntrepriseService,
    private route: ActivatedRoute,
    private keycloakService: KeycloakService
  ) { }

  ngOnInit(): void {
    this.resetEmployee();
    this.initentreprise();
    
  }

 public initentreprise () : void {
 const userId= <string>sessionStorage.getItem("userId");

 this.entrepriseService.getEntrepriseByAdminId(userId).subscribe(
  (data) => {
    this.entreprise = data;
    console.log('Fetched entreprise:', this.entreprise);

    // Once the entreprise object is fetched, set the entrepriseId for the employee
    this.employee.entrepriseId = this.entreprise.entrepriseId;
    this.getEmployeesByEntreprise(this.entreprise.entrepriseId);

  },
  (error: HttpErrorResponse) => {
    console.error("Erreur lors de la récupération de l'entreprise :", error);
  }
); }

isInvitationS:boolean =false;
  private resetEmployee(): void {
    this.employee = {
      idEmploye: '',
      nom: '',
      prenom: '',
      entrepriseId: 0,
      email: '',
      numTel: '',
      servicesCloud: []
    };
  }

  voirPlus(idEmploye: string) {

    console.log(idEmploye);
    this.router.navigate(['/employes'], { queryParams: { idemp: idEmploye } });
  
    }
  

  public addEmployee(): void {
     this.employee.entrepriseId=this.entreprise.entrepriseId;
     
     
    


    this.employeeservice.addEmployee(this.employee)
      .subscribe(
        (data) => {
          console.log("Employé ajouté avec succès :", data);
          this.resetEmployee();
          this.isInvitationSent = true;

          setTimeout(() => {
            this.isInvitationSent = false;
          }, 2000); 
        },
        (error: HttpErrorResponse) => {
          console.error("Une erreur s'est produite lors de la création de l'employé :", error);
 
          this.isInvitationS = true;

          setTimeout(() => {
            this.isInvitationS = false;
          }, 2000); 

            
        }
      );

      const id = this.entreprise.id;
    console.log('Current entrepriseId:', id);

    
  }
  employees: Employee[] = [];

  public getEmployeesByEntreprise(entrepriseId: number): void {
    this.employeeservice.getEmployesByEntreprise(entrepriseId)
      .subscribe(
        (data: Employee[]) => {
          console.log("Employés récupérés avec succès :", data);
          // Update the employee list in your component with the received data
          this.employees = data;
        },
        (error: HttpErrorResponse) => {
          console.error("Une erreur s'est produite lors de la récupération des employés :", error);
        }
      );
  }



  email: string = '';
  users: UserRepresentation[] | undefined;


  searchUsers() {
    if (this.email) {
      this.keycloakService.searchUsersByEmail(this.email, true)
        .subscribe(users => this.users = users);
    }
  }
}
