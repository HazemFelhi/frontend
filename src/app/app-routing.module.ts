import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AppComponent } from './app.component';
import { AproposComponent } from './apropos/apropos.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeComponent } from './employe/employe.component';
import { EmployesComponent } from './employes/employes.component';
import { CreateEntrepriseComponent } from './entreprise/create-entreprise/create-entreprise.component';
import { DashEntrepriseComponent } from './entreprise/dash-entreprise/dash-entreprise.component';
import { EntrepriseNewComponent } from './entreprise/entreprise-new/entreprise-new.component';
import { GestEntrepriseComponent } from './entreprise/gest-entreprise/gest-entreprise.component';
import { GestionEntrepriseComponent } from './entreprise/gestion-entreprise/gestion-entreprise.component';
import { JoinEntrepriseComponent } from './entreprise/join-entreprise/join-entreprise.component';
import { MonUpdateEntrepriseComponent } from './entreprise/mon-update-entreprise/mon-update-entreprise.component';
import { UpdateEntrepriseComponent } from './entreprise/update-entreprise/update-entreprise.component';
import { FactureComponent } from './facture/facture.component';
import { HistoriqueComponent } from './historique/historique.component';
import { IaasComponent } from './iaas/iaas.component';
import { LoginredirectComponent } from './loginredirect/loginredirect.component';
import { MembresComponent } from './membres/membres.component';
import { PanierComponent } from './panier/panier.component';
import { PaquetComponent } from './paquet/paquet.component';
import { SupportComponent } from './support/support.component';
import { AuthGuard } from './utility.ts/app.guard';

const routes: Routes = [ 
  { path: 'accueil', component: AccueilComponent },
  {path: 'apropos', component: AproposComponent },
 {path: 'contact', component: ContactComponent } ,
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'cond', component: ConditionsComponent },
  { path: 'Iaas', component: IaasComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'facture', component: FactureComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'support', component: SupportComponent },
  { path: 'paquet', component: PaquetComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'membres', component: MembresComponent ,    canActivate: [AuthGuard] },
  { path: 'employes', component: EmployesComponent },
  { path: 'employe', component: EmployeComponent },
  { path: 'loginredirect', component:   LoginredirectComponent  ,canActivate: [AuthGuard]},


  {
    path: 'entreprise',
    children: [
      { path: 'new', component: EntrepriseNewComponent , canActivate: [AuthGuard] },
      { path: 'create', component: CreateEntrepriseComponent },
      { path: 'join', component: JoinEntrepriseComponent ,canActivate: [AuthGuard]},
      { path: 'dash', component: DashEntrepriseComponent,    canActivate: [AuthGuard]    },
      { path: 'gestion', component: GestionEntrepriseComponent,canActivate: [AuthGuard] },
      { path: 'update', component: UpdateEntrepriseComponent ,canActivate: [AuthGuard] },
      { path: 'gest', component: GestEntrepriseComponent,canActivate: [AuthGuard] },
      { path: 'monup', component: MonUpdateEntrepriseComponent },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
