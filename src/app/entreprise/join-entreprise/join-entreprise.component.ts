import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular'; // Import KeycloakService
import { Invitation } from 'src/app/services/invitation/invitation';
import { InvitationService } from 'src/app/services/invitation/invitation.service';

@Component({
  selector: 'app-join-entreprise',
  templateUrl: './join-entreprise.component.html',
  styleUrls: ['./join-entreprise.component.css']
})
export class JoinEntrepriseComponent {
  invitation: Invitation = {
    id_invitation: 0,
    email: '',
    entrepriseId: 0,
    idEmploye: ''
  };
  invitationSent: boolean = false;
  private invitationTimer: any | null = null; // Déclaration de la propriété

  constructor(
    private invitationService: InvitationService,
    private keycloak: KeycloakService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthenticatedUserEmail();
  }

  private async getAuthenticatedUserEmail(): Promise<void> {
    if (await this.keycloak.isLoggedIn() && this.keycloak.getKeycloakInstance()) {
      const userEmail = this.keycloak.getKeycloakInstance()?.idTokenParsed?.['email'];
      // Set the user's email in the invitation object if it exists
      if (userEmail) {
        this.invitation.email = userEmail;
      }
    }
  }
  invitationNotSent:boolean=false;
  public createInvitation(): void {
    this.invitation.idEmploye=sessionStorage.getItem("userId") || '' ;

    this.invitationService.createInvitation(this.invitation)
      .subscribe(
        (data) => {
          if (data==null) {
             
            console.log("Invitation non crée");
            this.invitationNotSent = true; 
            this.invitationTimer = setTimeout(() => {
              this.invitationNotSent = false;
            }, 2000)
          }

          else{
          console.log("Invitation créée avec succès :", data);

          this.resetInvitation();
          this.invitationSent = true; 
          this.invitationTimer = setTimeout(() => {
            this.invitationSent = false;
          }, 2000); 
        }},
        (error: HttpErrorResponse) => {
          console.error("Une erreur s'est produite lors de la création de l'invitation :", error);
        }
      );
  }

  private resetInvitation(): void {
    this.invitation = {
      id_invitation: 0,
      email: '',
      entrepriseId: 0,
      idEmploye: ''
    };
  }
}
