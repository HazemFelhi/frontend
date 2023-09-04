import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'; // Import du module

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { APP_INITIALIZER } from '@angular/core';
import { initializeKeycloak } from './utility.ts/app.init'; 
import { AproposComponent } from './apropos/apropos.component';
import { ContactComponent } from './contact/contact.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConditionsComponent } from './conditions/conditions.component';
import { IaasComponent } from './iaas/iaas.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateEntrepriseComponent } from './entreprise/create-entreprise/create-entreprise.component';
import { JoinEntrepriseComponent } from './entreprise/join-entreprise/join-entreprise.component';
import { EntrepriseNewComponent } from './entreprise/entreprise-new/entreprise-new.component';
import { DashEntrepriseComponent } from './entreprise/dash-entreprise/dash-entreprise.component';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { PanierComponent } from './panier/panier.component';
import { FactureComponent } from './facture/facture.component';
import { HistoriqueComponent } from './historique/historique.component';
import { SupportComponent } from './support/support.component';
import { PaquetComponent } from './paquet/paquet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembresComponent } from './membres/membres.component';
import { GestionEntrepriseComponent } from './entreprise/gestion-entreprise/gestion-entreprise.component';
import { UpdateEntrepriseComponent } from './entreprise/update-entreprise/update-entreprise.component';
import { EmployesComponent } from './employes/employes.component';
import { EmployeComponent } from './employe/employe.component';
import { RedirectService } from './RedirectService';
import { GestEntrepriseComponent } from './entreprise/gest-entreprise/gest-entreprise.component';
import { LoginredirectComponent } from './loginredirect/loginredirect.component';
import { MonUpdateEntrepriseComponent } from './entreprise/mon-update-entreprise/mon-update-entreprise.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AproposComponent,
    ContactComponent,
    CatalogueComponent,
    ConditionsComponent,
    IaasComponent,
    HeaderComponent,
    FooterComponent,
    CreateEntrepriseComponent,
    JoinEntrepriseComponent,
    EntrepriseNewComponent,
    DashEntrepriseComponent,
    PanierComponent,
    FactureComponent,
    HistoriqueComponent,
    SupportComponent,
    PaquetComponent,
    DashboardComponent,
    MembresComponent,
    GestionEntrepriseComponent,
    UpdateEntrepriseComponent,
    EmployesComponent,
    EmployeComponent,
    GestEntrepriseComponent,
    LoginredirectComponent,
    MonUpdateEntrepriseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    HttpClientModule,
   AppRoutingModule,
    KeycloakAngularModule,
    CommonModule,
    Ng2SearchPipeModule,
    NgxExtendedPdfViewerModule

  ],
  providers: [
    { 
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true, /* j'ai ajouté injector et router pour effectuer le routage de keycloak après auth */
      deps: [KeycloakService, Injector, Router],
    },
    {provide:HTTP_INTERCEPTORS,useClass:RequestInterceptorService ,multi:true},
  ],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }
