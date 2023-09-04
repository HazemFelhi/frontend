import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak/keycloak.service';
import { Employee } from '../services/employee/employee';
import { EmployeeService } from '../services/employee/employee.service';
import { EntrepriseService } from '../services/entreprise/entreprise.service';
import { Invitation } from '../services/invitation/invitation';
import { InvitationService } from '../services/invitation/invitation.service';
import { UserRepresentation } from '../services/keycloak/keycloak.service';
import { invitationDetails } from '../services/invitation/invitationdetails';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

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
    idEmploye: '',
    nom: '',
    prenom: '',
    entrepriseId: 0,
    email: '',
    numTel: '',
    servicesCloud: []
  };
  invitation : Invitation ={
    id_invitation: 0,
    email: ' ',
    entrepriseId: 0 ,
    idEmploye: ''
 }




invitationsdetails :  invitationDetails[] = [];

 




  constructor(
    private employeeservice: EmployeeService,
    private router: Router,
    private entrepriseService: EntrepriseService,
    private route: ActivatedRoute,
    private invitationservice : InvitationService,
    private keycloakService :KeycloakService
  ) { }

  ngOnInit(): void {
    this.resetEmployee();
    this.initentreprise();
    this.keycloakService.searchUsersByEmail('', true)
    .subscribe(users => this.users = users);
    this.initemployees();

  }

  public initentreprise () : void {
    const userId= <string>sessionStorage.getItem("userId");
   
    this.entrepriseService.getEntrepriseByAdminId(userId).subscribe(
     (data) => {
       this.entreprise = data;
       console.log('Fetched entreprise:', this.entreprise);
   
       // Once the entreprise object is fetched, set the entrepriseId for the employee
       this.invitation.entrepriseId = this.entreprise.entrepriseId;
       this.getInvitationsByEntreprise(this.entreprise.entrepriseId);
   
     },
     (error: HttpErrorResponse) => {
       console.error("Erreur lors de la récupération de l'entreprise :", error);
     }
   ); }
   
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
        }
      );

      const id = this.entreprise.id;
    console.log('Current entrepriseId:', id);

    
  }
  invitations: Invitation[] = [];
  employees: Employee[] = [];
  public getInvitationsByEntreprise(entrepriseId: number): void {
    this.invitationservice.getInvitationsByEntreprise(entrepriseId)
      .subscribe(
        (data: Invitation[]) => {
          console.log("Invitations récupérés avec succès :", data);
          this.invitations = data;

          data.forEach(element => {
         const email=element.email;
         
         this.keycloakService.searchUsersByEmail(email, true)
         .subscribe(users => { 
         let invitationdetails: invitationDetails = {
            //de invitation
            id_invitation: 0,
            email: '4',
            entrepriseId: 0,
            //de keycloak
            user_id: '',
            username: '',
            firstName: '',
            lastName: '',
            mobile:'',
             isShown : true };
            
         invitationdetails.email=email;
         invitationdetails.firstName=users[0].firstName;
        invitationdetails.lastName=users[0].lastName;
         invitationdetails.mobile=users[0].attributes.mobile[0];
         invitationdetails.entrepriseId=element.entrepriseId;
         invitationdetails.id_invitation=element.id_invitation;
         invitationdetails.user_id=users[0].user_id;

        this.invitationsdetails.push(invitationdetails);
        

         }); 

         console.log(this.invitationsdetails);
           
        });  





        },
  
       

        (error: HttpErrorResponse) => {
          console.error("Une erreur s'est produite lors de la récupération des invitations :", error);
        }
      );

  }


  acceptInvitation(id_invitation: number): void {
    this.invitationservice.acceptInvitation(id_invitation).subscribe(
      () => {
        console.log('Invitation accepted successfully');
        // Remove the accepted invitation from the local list
        this.invitationsdetails.filter(
          (invitation) => invitation.id_invitation ===  id_invitation
        ).map(invitation=>invitation.isShown=false);
  
           this.initemployees ()  ;
      },
      (error: HttpErrorResponse) => {
        console.error(
          "Une erreur s'est produite lors de l'acceptation de l'invitation :",
          error
        );
      }
    );
  }
  





  rejectInvitation(id_invitation: number): void {
    this.invitationservice.rejectInvitation(id_invitation).subscribe(
      () => {
        console.log('Invitation supprimé');
        this.invitationsdetails.filter(
          (invitation) => invitation.id_invitation ===  id_invitation
        ).map(invitation=>invitation.isShown=false);
  
           this.initemployees ()  ;
      },      (error: HttpErrorResponse) => {
        console.error(
          "Une erreur s'est produite lors de la suppression de l'invitation :",
          error
        );
      }
    );


      
  }


















  searchedUsers:UserRepresentation[] | undefined;

  email: string = '';
  users: UserRepresentation[] | undefined;


  searchUsers() {
    if (this.email) {
      this.keycloakService.searchUsersByEmail(this.email, true)
        .subscribe(users => {this.searchedUsers = users
          console.log(users)
        
        });
    }
  }




  public initemployees () : void {

    this.employeeservice.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error: HttpErrorResponse) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des employés :",
          error
        );
      }
    );


      }



  }
































/*import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Employee } from '../services/employee/employee';
import { EmployeeService } from '../services/employee/employee.service';
import { EntrepriseService } from '../services/entreprise/entreprise.service';
import { Invitation } from '../services/invitation/invitation';
import { InvitationService } from '../services/invitation/invitation.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

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
    idEmploye: 0,
    nom: '',
    prenom: '',
    entrepriseId: 0,
    email: '',
    numTel: '',
    servicesCloud: []
  };
  invitation : Invitation ={
    id_invitation: 0,
    email: ' ',
    entrepriseId: 0 


  }
  keycloakProfile: KeycloakProfile | null = null;

  constructor(
    private employeeservice: EmployeeService,
    private router: Router,
    private entrepriseService: EntrepriseService,
    private route: ActivatedRoute,
    private invitationservice : InvitationService,private keycloakService: KeycloakService,
    private httpClient: HttpClient

  ) { }

  ngOnInit(): void {
    this.resetEmployee();
    this.initentreprise();
    this.keycloakService
    .loadUserProfile()
    .then((profile) => {
      this.keycloakProfile = profile;
      console.log('User profile:', this.keycloakProfile);
    })
    .catch((error) => {
      console.error('Error loading user profile:', error);
    });
  }

  public initentreprise () : void {
    const userId= <string>sessionStorage.getItem("userId");
   
    this.entrepriseService.getEntrepriseByAdminId(userId).subscribe(
     (data) => {
       this.entreprise = data;
       console.log('Fetched entreprise:', this.entreprise);
   
       // Once the entreprise object is fetched, set the entrepriseId for the employee
       this.invitation.entrepriseId = this.entreprise.entrepriseId;
       this.getInvitationsByEntreprise(this.entreprise.entrepriseId);
   
     },
     (error: HttpErrorResponse) => {
       console.error("Erreur lors de la récupération de l'entreprise :", error);
     }
   ); }
   
  private resetEmployee(): void {
    this.employee = {
      idEmploye: 0,
      nom: '',
      prenom: '',
      entrepriseId: 0,
      email: '',
      numTel: '',
      servicesCloud: []
    };
  }



  

  public addEmployee(): void {
    // Check if the email is available and not empty
    if (!this.employee.email.trim()) {
      console.error("Employee's email is required.");
      return;
    }

    // Perform an HTTP GET request to fetch the employee's profile based on the email
    this.httpClient.get<any>('http://localhost:8084/admin/realms/infrastructure/users', {
      headers: {
        Authorization: 'Bearer ' + this.keycloakService.getKeycloakInstance().token
      },
      params: {
        briefRepresentation: 'true',
        first: '0',
        max: '1',
        search: this.employee.email
      }
    }).subscribe(
      (response: any) => {
        // Assuming only one user is returned from the API based on the email search
        const user = response[0];
        this.employee.nom = user.lastName ?? '';
        this.employee.prenom = user.firstName ?? '';
        this.employee.entrepriseId = this.entreprise.id;

        // Now you can add the employee using the EmployeeService
        this.employeeservice.addEmployee(this.employee).subscribe(
          (data) => {
            console.log('Employé ajouté avec succès :', data);
            this.resetEmployee();
            this.isInvitationSent = true;
            setTimeout(() => {
              this.isInvitationSent = false;
            }, 2000);
          },
          (error: HttpErrorResponse) => {
            console.error("Une erreur s'est produite lors de la création de l'employé :", error);
          }
        );
      },
      (error: HttpErrorResponse) => {
        console.error("Une erreur s'est produite lors de la récupération du profil de l'employé :", error);
      }
    );
  }

      
  
  
  
  
      
  invitations: Invitation[] = [];
  employees: Employee[] = [];
  public getInvitationsByEntreprise(entrepriseId: number): void {
    this.invitationservice.getInvitationsByEntreprise(entrepriseId)
      .subscribe(
        (data: Invitation[]) => {
          console.log("Invitations récupérés avec succès :", data);
          // Update the employee list in your component with the received data
          this.invitations = data;
        },
        (error: HttpErrorResponse) => {
          console.error("Une erreur s'est produite lors de la récupération des invitations :", error);
        }
      );
  }








  rejectInvitation(id_invitation: number): void {
    this.invitationservice.rejectInvitation(id_invitation)
      .subscribe(
        () => {
          console.log('Invitation rejected successfully');
          // Remove the rejected invitation from the local list
          this.invitations = this.invitations.filter(invitation => invitation.id_invitation !== id_invitation);
        },
        (error: HttpErrorResponse) => {
          console.error("Une erreur s'est produite lors de la suppression de l'invitation :", error);
        }
      );
  }









  } */