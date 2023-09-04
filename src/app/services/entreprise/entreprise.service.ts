import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise } from './entreprise';
@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {




  private baseUrl = 'http://localhost:8081'; // URL du backend Java

  constructor(private http: HttpClient) { }

  getEntrepriseById(entrepriseId: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.baseUrl}/entreprises/${entrepriseId}`);
  }

  createEntreprise(entreprise: Entreprise): Observable<Entreprise>{
    return this.http.post<Entreprise>(`${this.baseUrl}/entreprises`, entreprise);
  }

  updateEntreprise(entreprise: Entreprise): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.baseUrl}/entreprises`, entreprise);
  }


  deleteEntreprise(entrepriseId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/entreprises/${entrepriseId}`);
  }

  getAllEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(`${this.baseUrl}/entreprises`);
  }

  getEntrepriseByName(name: string): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.baseUrl}/entreprises/name/${name}`);
  }
  getEntrepriseByAdminId(adminId: string): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.baseUrl}/entreprises/byuserid/${adminId}`);
  }


}
