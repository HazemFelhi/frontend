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
  selector: 'app-gest-entreprise',
  templateUrl: './gest-entreprise.component.html',
  styleUrls: ['./gest-entreprise.component.css']
})
export class GestEntrepriseComponent  implements OnInit{
  entrepriseDetails: Entreprise | null = null; // Use 'null' if it can be optional
  chart: any;
  isShown: boolean = false ; // hidden by default


  ngOnInit(): void {



    this.route.queryParamMap.subscribe((params) => {
      const documentId = params.get("id_document"); // Retrieve the document ID from route parameters

     this.entreprise.entrepriseId = params.get("eid") || 0 ;
     this.getEntrepriseById (this.entreprise.entrepriseId);
     this.getDocumentsByEntreprise(this.entreprise.entrepriseId); // Use this.entreprise.entrepriseId





     this.entreprise.entrepriseId = params.get("abc") || 0 ;
     this.getEntrepriseById (this.entreprise.entrepriseId);











     if (this.entreprise.entrepriseId) {
      this.getDocumentsByEntreprise(+this.entreprise.entrepriseId); // Convert to number
    }
    if (documentId) {
      this.changeDocumentStatus(documentId, 'valide');
  } 
      console.log(params);
      console.log(this.entreprise.entrepriseId);

      console.log(this.doc.id_document);

    });

    const document: Document = {
      id_document: this.doc.id_document,
      titreDocument: this.doc.titreDocument, // Set the document title
      fichier: this.selectedFile,
      entrepriseId: this.entreprise.entrepriseId,
      document_status:this.doc.document_status
    };


    this.chart = new Chart('myChart1', {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [12, 5, 2, 3],
            backgroundColor: ['#cfcfec', '#2626ac', '#7B7BF3', '#1515e9'],
            borderColor: ['#cfcfec', '#2626ac', '#7B7BF3', '#7B7BF3'],
            borderWidth: 1
          }
        ]
      }
    });


  }



constructor(private entrepriseService: EntrepriseService,private keycloakService: KeycloakService,    private route: ActivatedRoute,private router: Router ,private documentService :DocumentService,
  private sanitizer: DomSanitizer


  ) {   

}
isAuthenticated: Promise<boolean> | undefined;





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
    },
    (error: HttpErrorResponse) => {
      console.error("Erreur lors de la récupération de l'entreprise :", error);
    }
  );
}
documents: Document[] = [];
pdfURL: SafeResourceUrl | undefined;









/*getDocumentsByEntreprise(entrepriseId: number): void {
  this.documentService.getDocumentsByEnterprise(entrepriseId).subscribe(
    (response: HttpResponse<Blob>) => {
      const contentType = response.headers.get('content-type');
      console.log(response.body);
      if (contentType === 'application/pdf') {
        if (response.body) {
          const blob = new Blob([response.body], { type: 'application/pdf' });
          this.pdfURL = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
        } else {
          console.error('Received content is null');
        }
      } else {
        console.error('Received content is not a PDF');
      }
    },
    (error: HttpErrorResponse) => {
      console.error('Error while fetching documents:', error);
    }
  );
} */


getDocumentsByEntreprise(entrepriseId: number): void {
  this.documentService.getDocumentsByEnterprise(entrepriseId).subscribe(
    (response) => {
 for ( var i of response)
 {
  console.log(i.id_document);

   if(  i.document_status=='valide' )
   {
    this.isShown=false;
   continue;

   }
  const byteArray = new Uint8Array(atob(i.fichier).split('').map(char => char.charCodeAt(0)));
  var blob= new Blob([byteArray], {type: 'application/pdf'});
  this.pdfURL = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
  this.isShown=true;
  const document: Document = {
    id_document: i.id_document,
    titreDocument: i.titreDocument, // Set the document title
    fichier: i.fichier ,
    entrepriseId: i.entrepriseId,
    document_status:i.document_status
  };

  this.doc=document;

}




},
    (error: HttpErrorResponse) => {
      console.error('Error while fetching documents:', error);
    }
  );
}


extractFileNameFromUrl(url: SafeResourceUrl): string {
  const urlString = url.toString(); // Convert SafeResourceUrl to a regular string
  const urlSegments = urlString.split('/');
  const fileName = urlSegments[urlSegments.length - 1];
  return decodeURIComponent(fileName);
}



updateDetails(entrepriseId: number) {

  console.log(entrepriseId);
  this.router.navigate(['/entreprise/update'], { queryParams: {  eid: entrepriseId } });

  }
  doc: Document = {
    id_document: '',
    titreDocument: '',
    fichier: null,
    entrepriseId: 0,
    document_status:''
  };
  selectedFile: File | null = null; 


  changeDocumentStatus(id_document: string, document_status: string): void {
    if (this.entreprise.entrepriseId) {
        this.documentService.changeDocumentStatus(id_document, document_status).subscribe(
            (response) => {
                console.log('Document status changed successfully');
                console.log(response);
                if (response.status==200){
                  
                  this.isShown=false;
                }
            },
            (error) => {
                console.error('Error changing document status:', error);
            }
        );
    }
   


}







deleteDocument(id_document: String): void {
  this.documentService.deleteDocument(id_document)
    .subscribe(
      (response) => {
        console.log('Suprrimé avec succés  ');
        console.log(response);
        this.isShown=false;
      },
      (error: HttpErrorResponse) => {
        console.error("Une erreur s'est produite lors de la suppression de l'invitation :", error);
      }
    );
} 







  
  validateDocument(): void {
    this.pdfURL = undefined; // This will remove the displayed PDF
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








deleteEnterprise(entrepriseId: number): void {
  this.entrepriseService.deleteEntreprise(entrepriseId).subscribe(
    () => {
      console.log('Entreprise deleted successfully');
    },
    (error: HttpErrorResponse) => {
      console.log('Entreprise deleted successfully:', error);
    }
  );
}



}
