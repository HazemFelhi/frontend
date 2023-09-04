import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  selector: 'app-dash-entreprise',
  templateUrl: './dash-entreprise.component.html',
  styleUrls: ['./dash-entreprise.component.css']
})
export class DashEntrepriseComponent implements OnInit {
  chart: any;
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

  constructor(
    private documentService: DocumentService,
    private entrepriseService: EntrepriseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  showSuccessMessage = false;
  showTitleError = false;

  ngOnInit(): void {
    /*this.route.queryParams.subscribe(params => {
      const created = params['created'];
      if (created === 'true') {
        const id = +params['id'];
        this.getEntrepriseByAdminId(id);
      }
    });*/
    const adminId=<string>sessionStorage.getItem("userId");
    this.getEntrepriseByAdminId(adminId);


    this.chart = new Chart('myChart1', {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [12, 5, 2, 3],
            backgroundColor: ['#cfcfec', '#2626ac', '#7B7BF3', '#1515e9', '#7B7BF3'],
            borderColor: ['#cfcfec', '#2626ac', '#7B7BF3', '#7B7BF3'],
            borderWidth: 1
          }
        ]
      }
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
  public getEntrepriseByAdminId(adminId: string): void {
    this.entrepriseService.getEntrepriseByAdminId(adminId).subscribe(
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

  isHistoriquePage: boolean = true;













  document: Document = {
    id_document: '',
    titreDocument: '',
    fichier: null, // Use 'null' to initialize the 'fichier' property
    entrepriseId: 0,
    document_status:''
  };
    selectedFile: File | null = null; 
    public uploadDocument(): void {
      console.log('Current entrepriseId:', this.entreprise.entrepriseId);
    
      if (typeof this.entreprise.entrepriseId !== 'number' || isNaN(this.entreprise.entrepriseId)) {
        console.error('entrepriseId is not set properly.');
        return;
      }
    
      if (!this.document.titreDocument) {
        this.showTitleError = true;
        return;
      }
    
      if (!this.selectedFile) { 
        console.error('No file selected.');
        return;
      }
    
      // Create a new Document object and set its properties
      const document: Document = {
        id_document: this.document.id_document,
        titreDocument: this.document.titreDocument, // Set the document title
        fichier: this.selectedFile,
        entrepriseId: this.entreprise.entrepriseId,
        document_status:this.document.document_status
      };
    
      this.documentService.uploadDocument(this.selectedFile, this.entreprise.entrepriseId).subscribe(
        (data) => {
          console.log("Réponse du serveur :", data);
          console.log("Document créé avec succès :", data.body);
          this.resetDocument();
          this.showSuccessMessage = true;
    
          // Reset the success message after 2 seconds
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 2000);
        },
        (error:HttpErrorResponse) => {

          console.error("Une erreur s'est produite lors de la création du document :", error);
        }
      );
    }
       
  private resetDocument(): void {
    this.document = {
      id_document: '',
      titreDocument: '',
      fichier: null, 
      entrepriseId: 0,
      document_status:''
    };
  }
  

  updateDetails(entrepriseId: number) {

    console.log(entrepriseId);
    this.router.navigate(['/entreprise/monup'], { queryParams: {  eid: entrepriseId } });
  
    }
  

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Attribuer le fichier sélectionné à selectedFile
      this.document.fichier = file.name;
    }
  }








}
