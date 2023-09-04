import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { PackVmService } from '../services/packVm/pack-vm.service';
import { PackVm } from '../services/packVm/PackVm';
@Component({
  selector: 'app-paquet',
  templateUrl: './paquet.component.html',
  styleUrls: ['./paquet.component.css']
})
export class PaquetComponent {
  isAuthenticated: Promise<boolean> | undefined;
  constructor(private keycloakService: KeycloakService, private router: Router,private packVmService: PackVmService,private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getAllPackVms();

    this.initializeUserOptions();
    this.checkAuthentication();

  }

  getAllPackVms(): void {
    this.packVmService.getAllPackVms().subscribe(
      (packVms: PackVm[]) => {
        this.packVms = packVms;
      },
      (error: any) => {
        console.error('Error while fetching PackVms:', error);
      }
    );
  }

  log(): void {
    
    this.keycloakService.login();
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





  packVms: PackVm[] = [];



/* <div class="button-2">
              <div class="button-1 valign-text-middle sfpro-bold-wild-sand-18px accept-button "  *ngIf="!isAuthenticated" (click)="log()" style="background-color: #397BFF;" >Ajouter au panier</div>
              <div class="button-1 valign-text-middle sfpro-bold-wild-sand-18px accept-button "  *ngIf="isAuthenticated" [routerLink]="'/panier'" style="background-color: #397BFF;" routerLink="/panier">Ajouter au panier</div>
        </div> */


        publishPackVm(vm: PackVm): void {
          // Call the backend API to publish the selected VM
          this.packVmService.publishPackVm(vm).subscribe(
            (publishedVm: PackVm) => {
              console.log('PackVm publié avec succès :', publishedVm);
              // Faire ce que vous voulez avec la réponse publiée (publishedVm)
            },
            (error: any) => {
              console.error('Erreur lors de la publication du PackVm :', error);
            }
          );
      
          // Now, also send the selected VM to RabbitMQ using HttpClient
          this.http.post<any>('http://localhost:8082/packVms/publish', vm).subscribe(
            (response: any) => {
              console.log('VM characteristics sent to RabbitMQ:', response);
            },
            (error: any) => {
              console.error('Error sending VM characteristics to RabbitMQ:', error);
            }
          );
        }
      
      
      
        
}
